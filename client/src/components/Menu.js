import { Component } from "react";
import { NavLink } from 'react-router-dom'
import './Menu.css'

class Menu extends Component {


    render() {
        return (
            <div className="menu">
                <div className="menu-item"><NavLink to = "/">Home</NavLink></div>
                <div className="menu-item"><NavLink to = "/add-book">Add Book</NavLink></div>
            </div>
        )
    }

}

export default Menu