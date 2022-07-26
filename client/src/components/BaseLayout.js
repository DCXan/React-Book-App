
import Menu from "./Menu";
import './BaseLayout.css'


function BaseLayout (props) {
    
    return (
        <div className="base">
                <Menu/>
                <h1 className="siteName">React Book App</h1>
                {props.children}
            </div>
    )
}

export default BaseLayout