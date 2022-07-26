import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './components/BookList.css'
import { useNavigate } from 'react-router-dom';
import * as actionCreators from './store/creators/actionCreators'

function App(props) {

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
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchBox.bookSearch}&key=AIzaSyCpAycTAMnNxhMzZPiJbZL-2Z-h5rk9Xsg&maxResults=40`)
      
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
    // setFavorite(favoriteBook)

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
              <button onClick={() => props.addCart(book.volumeInfo.title)}>Add to Cart</button>
            </div>
        </li>
    )
})

    return (
      <div className='bookSearch' >
        <div className='searchField'>
          <input type='text' placeholder='Search for a Book' onChange={handleInput} name='bookSearch'/>
          <button onClick={fetchBooks}>Search</button>
        </div>
        <ul className='bookList'>
          {bookItems}
        </ul>
      </div>
    )
  
}

const mapStateToProps = (state) => {
  return {
      isAuth: state.authReducer.isAuthenticated,
      userID: state.authReducer.userID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (book) => dispatch(actionCreators.addToCart(book))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App)
