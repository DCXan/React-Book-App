import { NavLink } from 'react-router-dom'
import './Menu.css'
import { connect } from 'react-redux'
import React from 'react'
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';
import * as actionCreators from '../store/creators/actionCreators'
import { ShoppingCart } from 'react-feather'

function Menu (props) {
    
    const navigate = useNavigate()
    const token = localStorage.getItem('jwt')

    const logout = () => {

        props.onLogout()
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className="menu">
            <div className='title'>
                <h1>React Book App</h1>
            </div>
            <div className="menu-items">
                <NavLink to = "/">Home</NavLink>
                { token ? <NavLink to = "/my-books">Favorite Books</NavLink> : null }
                { token ? null : <NavLink to = "/register">Register</NavLink> }
                { token ? <div className='cart'>(<ShoppingCart/> <b className='cart-label'> {props.cart.length})</b></div> : null }
                { token ? <NavLink to = "/my-cart">View Cart</NavLink> : null }
                { token ? <button className = "logout-button" onClick={logout}>Log Out</button> : <Link to = "/login"><button className='login-button'>Log In</button></Link> }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actionCreators.logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Menu)