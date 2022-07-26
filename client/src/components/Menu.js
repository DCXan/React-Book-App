import { NavLink } from 'react-router-dom'
import './Menu.css'
import { connect } from 'react-redux'
import React from 'react'
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';
import * as actionCreators from '../store/creators/actionCreators'

function Menu (props) {
    console.log('menu')
    const navigate = useNavigate()
    const token = localStorage.getItem('jwt')

    const logout = () => {

        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className="menu">
                <NavLink to = "/">Home</NavLink>
                { token ? <NavLink to = "/my-books">My Books</NavLink> : null }
                { token ? null : <NavLink to = "/register">Register</NavLink> }
                { token ? <button onClick={logout}>Log Out</button> : <Link to = "/login"><button>Log In</button></Link> }
                {/* <div className='cart'>
                    Books in Cart: {props.cart.length}
                </div> */}
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         isAuth: state.authReducer.isAuthenticated,
//         cart: state.cartReducer.cart
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onLogout: () => dispatch(actionCreators.logOut())
//     }
// }

export default Menu