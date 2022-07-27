import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './components/BookList.css'
import { useNavigate } from 'react-router-dom';
import * as actionCreators from './store/creators/actionCreators'

function App(props) {

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

  const navigate = useNavigate()

  const token = localStorage.getItem('jwt')
  const userID = localStorage.getItem('userID')

  const [books, setBooks] = useState([])
  const [searchBox, setSearchBox] = useState({
    bookSearch: 'reading'
  })
  // const [favorite, setFavorite] = useState({})

  const handleInput = (e) => {
    setSearchBox({
      [e.target.name]: e.target.value
    })
  }

  const fetchBooks = async () => {
  
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchBox.bookSearch}&key=${apiKey}&maxResults=40`)
      
      const result = await response.json()
      setBooks(result.items)

    } catch (error) {
      // console.log(error)
      alert('Please enter at least one search term.')
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const addToFavorites = async (book) => {

    const imageLinks = book.volumeInfo.imageLinks
    const releaseDate = book.volumeInfo.publishedDate

    const favoriteBook = {
        title: book.volumeInfo.title,
        genre: (book.volumeInfo.categories) ? book.volumeInfo.categories[0]: null,
        publisher: book.volumeInfo.publisher,
        year: parseInt(releaseDate.substring(0,4)),
        imageURL: (imageLinks && imageLinks.thumbnail) ? book.volumeInfo.imageLinks.thumbnail : require('./images/default-cover.jpg'),
        userID: userID
    }
    

    const response = await fetch('http://localhost:8080/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(favoriteBook)
    })
      const result = response.json()

      if (result.success) {
        navigate('/')
      }
  }

  if (books !== undefined) {
    
    const bookItems = books.map(book => {
  
      const imageLinks = book.volumeInfo.imageLinks
      
      return (
          <li key = {book.id} className="bookItem">
              <b>{book.volumeInfo.title}</b>
              <label>{book.volumeInfo.authors}</label>
              <i>{book.volumeInfo.publishedDate}</i>
              <label>{book.volumeInfo.categories}</label>
              <label>{book.volumeInfo.publisher}</label>
              <img src = {imageLinks && imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : require('./images/default-cover.jpg')} alt = ''/>
              <div className='userBooks'>
                <button onClick={() => addToFavorites(book)}>Add to Favorites</button>
                <button onClick={() => props.addCart(book)}>Add to Cart</button>
              </div>
          </li>
      )
    })
      return (
        <div className='bookSearch'>
          <div className='searchField'>
            <h2>Search for a Book</h2>
            <div>
              <input type='text' placeholder='Search for a Book' onChange={handleInput} name='bookSearch'/>
              <button onClick={fetchBooks} className="searchButton">Search</button>
            </div>
          </div>
          <ul className='bookList'>
            {bookItems}
          </ul>
        </div>
      )
  
  } else {
     return (
      <div className='bookSearch'>
      <div className='searchField'>
        <h4>Search for a Book</h4>
        <div>
          <input type='text' placeholder='Search for a Book' onChange={handleInput} name='bookSearch'/>
          <button onClick={fetchBooks} className="searchButton">Search</button>
        </div>
      </div>
      <h3>Your search did not match any books. Please try again.</h3>
    </div>
     )
  }


  
}

const mapStateToProps = (state) => {
  return {
      isAuth: state.authReducer.isAuthenticated,
      userID: state.authReducer.userID,
      cart: state.cartReducer.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (book) => dispatch(actionCreators.addToCart(book))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App)
