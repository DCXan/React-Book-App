
import Menu from "./Menu";
import './BaseLayout.css'


function BaseLayout (props) {
    
    return (
        <div className="base">
                <Menu/>
                {/* <h1 className="siteName">React Book App</h1> */}
                <div className="main-display">
                    {props.children}
                </div>
            </div>
    )
}

export default BaseLayout