import { Link } from "react-router-dom";
import './navcss.css';
const Nav = () => {
    return (
<div>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="nav navbar-nav">
                    <Link className="nav-item nav-link active" to='/'>Home</Link>
                    <Link className="nav-item nav-link active" to='/Products'>Products</Link>
                    <Link className="nav-item nav-link active" to='/Checkout'><i class="fa-solid fa-cart-shopping fa-bounce"></i>Checkout </Link>
                    

                </div>
            </nav>
        </div>
    );
}

export default Nav;