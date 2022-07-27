import React, { useState, useEffect }from 'react'
import './BookList.css'

function BookList(props) {

    const token = localStorage.getItem('jwt')
    const userID = localStorage.getItem('userID')
    
    const [books, setBooks] = useState([])
    
    useEffect(() => {
        getMyBooks()
    }, [])

    const getMyBooks = async () => {

        const response = await fetch(`${process.env.REACT_APP_SERVER}/books/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
    })
        const result = await response.json()

        if (result.success) {
            setBooks(result.books)
        }
    }

    const deleteBook = async (bookID) => {

        const response = await fetch(`${process.env.REACT_APP_SERVER}/books/${userID}/${bookID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json()
        if (result.success) {
            getMyBooks()
        }
    }

    const bookItems = books.map(book => {
        return (
            <li key = {book.id} className="bookItem">
                <b>{book.title}</b>
                <i>{book.year}</i>
                <label>{book.genre}</label>
                <label>{book.publisher}</label>
                <img src = {book.imageURL} alt = ''/>
                <button onClick={() => deleteBook(book.id)} className="deleteButton">Delete</button>
            </li>
        )
    })

    return (
        <div>
            <h2>My Favorites</h2>
            <ul className="bookList">
                {bookItems}
            </ul>
        </div>
    )
    
}

export default BookList