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
                    <div className="menu-item"><NavLink to = "/add-book">Add Book</NavLink></div>
                    <button onClick={logout}>Log Out</button>
                    <div className='cart'>
                        # of Books in Cart
                    </div>
                </div>
        )
    } else {
        return (
            <div className="menu">
                    <div className="menu-item"><NavLink to = "/">Home</NavLink></div>
                    <div className="menu-item"><NavLink to = "/register">Register</NavLink></div>
                    <Link to = "/login">
                        <button>Log In</button>
                    </Link>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actionCreators.logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Menu)