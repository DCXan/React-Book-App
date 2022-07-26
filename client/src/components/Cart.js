import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import './BookList.css'

function Cart (props) {
    
    const books = props.cart

    const bookItems = books.map(book => {

        const imageLinks = book.volumeInfo.imageLinks

        return (
            <li key = {book.id} className="bookItem">
                <b>{book.volumeInfo.title}</b>
                <label>{book.volumeInfo.authors}</label>
                <i>{book.volumeInfo.publishedDate}</i>
                <label>{book.volumeInfo.categories}</label>
                <label>{book.volumeInfo.publisher}</label>
                <img src = {imageLinks && imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : require('../images/default-cover.jpg')} alt = ''/>
                <div className='userBooks'>
                <button onClick={() => props.onDelete(book)} className="deleteButton">Remove from Cart</button>
                </div>
            </li>
        )
    })


    return (
        <div>
            <h2>Books in my Cart</h2>
            <ul className="bookList">
                {bookItems}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (removedBook) => dispatch(actionCreators.cartDelete(removedBook))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Cart)