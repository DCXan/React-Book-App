import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Login() {

    const [user, setUser] = useState({})
    let navigate = useNavigate()

    const handleInput = (e) => {
        
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    
    const login = async () => {

        const response = await fetch('http://localhost:8080/login', {
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
        <div className='loginBlock'>
            <h2>Log In to your Book App account</h2>
            <input type = "text" name="email" onChange={handleInput} placeholder="Email"/>
            <input type = "text" name="password" onChange={handleInput} placeholder="Password"/>
            <button onClick={login}>Log In</button>
        </div>
    )
}

export default Login