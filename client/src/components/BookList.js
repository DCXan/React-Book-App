import { Component } from "react";
import './BookList.css'

class BookList extends Component {


    render() {

        const books = this.props.books
        console.log(books)
        const bookItems = books.map(book => {
            return (
                <li key = {book.id} className="bookItem">
                    <b>{book.title}</b>
                    <i>{book.year}</i>
                    <label>{book.genre}</label>
                    <label>{book.publisher}</label>
                    <img src = {book.imageURL}/>
                </li>
            )
        })

        return (
            <ul className="bookList">
                {bookItems}
            </ul>
        )
    }
}

export default BookList