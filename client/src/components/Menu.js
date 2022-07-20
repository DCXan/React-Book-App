import { NavLink } from 'react-router-dom'
import './Menu.css'
import { connect } from 'react-redux'

function Menu (props) {

    
    // console.log(props.isAuth)
    return (
        <div className="menu">
                <div className="menu-item"><NavLink to = "/">Home</NavLink></div>
                <div className="menu-item"><NavLink to = "/add-book">Add Book</NavLink></div>
                <div className="menu-item"><NavLink to = "/login">Log In</NavLink></div>
                <div className="menu-item"><NavLink to = "/register">Register</NavLink></div>
                <button>Log Out</button>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        // isAuth: state.userID
    }
}

export default connect(mapStateToProps) (Menu)