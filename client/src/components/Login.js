import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Menu from './Menu'


function Login() {

    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    let navigate = useNavigate()

    const handleInput = (e) => {
        
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const login = async () => {

        const response = await fetch(`${process.env.REACT_APP_SERVER}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(user)
        })

        const result = await response.json()

        if (result.success) {
            const userID = result.userID
            localStorage.setItem('userID', userID)
            localStorage.setItem('jwt', result.token)
            navigate('/')
        } else {
            setMessage('Unable to log in. Please check credentials and try again.')
        }
    }

    return (
        <div className='loginBlock'>
            <h2>Log In to your Book App account</h2>
            <div className='loginInput'>
                <input type = "text" name="email" onChange={handleInput} placeholder="Email"/>
                <input type = "password" name="password" onChange={handleInput} placeholder="Password"/>
                <button onClick={login}>Log In</button>
            </div>
            <h3>{message}</h3>
        </div>
    )
}


export default Login