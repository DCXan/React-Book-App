import React, { useEffect, useState } from 'react'
import BookList from "./components/BookList";


function App() {

  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    const userID = localStorage.getItem('userInfo')
    
    const response = await fetch(`http://localhost:8080/books/${userID}`)
    
    const result = await response.json()
    setBooks(result)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

    return (
      <div>
        <BookList books = {books} onDelete = {fetchBooks}/>
      </div>
    )
  
}

export default App
