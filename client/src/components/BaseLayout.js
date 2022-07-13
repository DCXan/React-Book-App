import { Component } from "react";
import App from "../App";
import AddBook from "./AddBook";
import Menu from "./Menu";
import './BaseLayout.css'


class BaseLayout extends Component {

    render() {
        return (
            <div className="base">
                <Menu/>
                <h1 className="siteName">React Book App</h1>
                {this.props.children}
            </div>
        )
    }
}

export default BaseLayout