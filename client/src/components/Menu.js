import { NavLink } from 'react-router-dom'
import './Menu.css'
import { connect } from 'react-redux'
import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import * as actionCreators from '../store/creators/actionCreators'

function Menu (props) {

    const logout = () => {

        props.onLogout()
    }

    if (props.isAuth) {
        return (
            <div className="menu">
                    <div className="menu-item"><NavLink to = "/">Home</NavLink></div>
                    <div className="menu-item"><NavLink to = "/my-books">My Books</NavLink></div>
                    <button onClick={logout}>Log Out</button>
                    <div className='cart'>
                        Books in Cart: {props.cart.length}
                    </div>
                </div>
        )
    } else {
        return (
            <div className="menu">
                    <div className="menu-item"><NavLink to = "/">Home</NavLink></div>
                    <div className="menu-item"><NavLink to = "/my-books">My Books</NavLink></div>
                    <div className="menu-item"><NavLink to = "/register">Register</NavLink></div>
                    <Link to = "/login">
                        <button>Log In</button>
                    </Link>
                    <div className='cart'>
                        Books in Cart: {props.cart.length}
                    </div>
                </div>
        )
    }
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