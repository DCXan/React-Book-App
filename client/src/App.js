import React, { useEffect, useState } from 'react'
import BookList from "./components/BookList";
import { connect } from 'react-redux'
import './components/BookList.css'

function App(props) {

  const [books, setBooks] = useState([])
  const [searchBox, setSearchBox] = useState({
    bookSearch: 'javascript'
  })

  const handleInput = (e) => {
    setSearchBox({
      [e.target.name]: e.target.value
    })
  }

  const fetchBooks = async () => {
    // const userID = localStorage.getItem('userInfo')
    // const userID = props.userID
    
    console.log(typeof(searchBox))
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchBox.bookSearch}&key=&maxResults=40`)
      
      const result = await response.json()
      setBooks(result.items)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const bookItems = books.map(book => {

    const imageLinks = book.volumeInfo.imageLinks
    // const thumbnail = book.volumeInfo.imageLinks.thumbnail
    
    if (imageLinks && imageLinks.thumbnail) {
      return (
          <li key = {book.id} className="bookItem">
              <b>{book.volumeInfo.title}</b>
              <label>{book.volumeInfo.authors}</label>
              <i>{book.volumeInfo.publishedDate}</i>
              <label>{book.volumeInfo.categories}</label>
              <label>{book.volumeInfo.publisher}</label>
              <img src = {book.volumeInfo.imageLinks.thumbnail} alt = ''/>
          </li>
      )

    } else {
      return (
        <li key = {book.id} className="bookItem">
              <b>{book.volumeInfo.title}</b>
              <label>{book.volumeInfo.authors}</label>
              <i>{book.volumeInfo.publishedDate}</i>
              <label>{book.volumeInfo.categories}</label>
              <label>{book.volumeInfo.publisher}</label>
              <img src = {'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/1200px-Placeholder_book.svg.png'} alt = ''/>
          </li>
      )
    }

})

    return (
      <div>
        {/* <BookList books = {books} onDelete = {fetchBooks}/> */}
        <input type='text' placeholder='Search for a Book' onChange={handleInput} name='bookSearch'/>
        <button onClick={fetchBooks}>Search</button>
        <ul className='bookList'>
          {bookItems}
        </ul>
      </div>
    )
  
}

// const mapStateToProps = (state) => {
//   return {
//       userID: state.userID
//   }
// }

export default (App)
