import React from 'react'
import './BookList.css'

function BookList(props) {

    const books = props.books

    const deleteBook = async (bookID) => {

        const response = await fetch(`http://localhost:8080/books/${bookID}`, {
            method: 'DELETE'
        })
        const result = await response.json()
        if (result.success) {
            props.onDelete()
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
                <button onClick={() => deleteBook(book.id)}>Delete</button>
            </li>
        )
    })

    return (
        <ul className="bookList">
            {bookItems}
        </ul>
    )
    
}

export default BookList