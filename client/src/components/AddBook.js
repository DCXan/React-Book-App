import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './AddBook.css'

function AddBook() {
    
    const [newBook, setNewBook] = useState({})
    const navigate = useNavigate()
    
    const userID = localStorage.getItem('userInfo')

    const handleInput = (e) => {
        setNewBook({
            ...newBook,   
            [e.target.name]: e.target.value,
            userID: userID
        })
    }

    const addNewBook = async () => {

        try {
            const response = await fetch('http://localhost:8080/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBook)
            })

            const books = await response.json()
            if(books.success) {
                console.log(newBook)
                navigate('/')
            }
        } catch(error) {
            console.log(error)
                navigate('/add-book')
        }
    }

    return (
        <div className="addBookMenu">
            <input type = "text" name="title" onChange={handleInput} placeholder="Title"/>
            <input type = "text" name="genre" onChange={handleInput} placeholder="Genre"/>
            <input type = "text" name="publisher" onChange={handleInput} placeholder="Publisher"/>
            <input type = "text" name="year" onChange={handleInput} placeholder="Year"/>
            <input type = "text" name="imageURL" onChange={handleInput} placeholder="imageURL"/>
            <button onClick={addNewBook}>Add Book</button>
        </div>
    )
}


export default AddBook