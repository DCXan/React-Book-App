import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function AddBooks() {

    const [book, setBook] = useState({})
    let navigate = useNavigate()

    const handleInput = (e) => {
        setBook({
            ...book,  
            [e.target.name]: e.target.value 
        })
    }

    const addNewBook = async () => {

        const response = await fetch(`${process.env.REACT_APP_SERVER}/books`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(book)
        })

        const result = await response.json()

        if (result.success) {
            navigate('/')
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

export default AddBooks