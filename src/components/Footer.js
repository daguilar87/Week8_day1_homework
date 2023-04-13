import { Link } from "react-router-dom";
import './footercss.css';
const Footer = () => {
    return (
<div>
            
                <div className="footer">
                    <Link className="nav-item nav-link active" to='#'>About Us</Link>
                    <Link className="nav-item nav-link active" to='#'>Contact Us</Link>
                    <Link className="nav-item nav-link active" to='#'>Help</Link>
                

                </div>
       
        </div>
    );
}

export default Footer;