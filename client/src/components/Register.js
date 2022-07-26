import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './Login.css'

function Register() {

    const [user, setUser] = useState({})
    let navigate = useNavigate()

    const handleInput = (e) => {
        
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    
    const createUser = async () => {

        const response = await fetch('http://localhost:8080/register', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(user)
        })

        const result = await response.json()

        if (result.success) {
            navigate('/')
        }
        
    }


    return (
        <div className='registerBlock'>
            <h2>Create a Book App account</h2>
            <div className='registerInput'>
                <input type = "text" name="email" onChange={handleInput} placeholder="Email"/>
                <input type = "text" name="password" onChange={handleInput} placeholder="Password"/>
                <button onClick={createUser}>Register</button>
            </div>
        </div>
    )
}

export default Register