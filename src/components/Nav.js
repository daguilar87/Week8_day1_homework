import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import './navcss.css'
import { DataContext } from "../context/DataProvider";
import { useAuth, useUser, useSigninCheck, useDatabase } from "reactfire";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { get, child, ref } from "firebase/database";
import logo1 from '../css/media/logo1.jpeg'


const Nav = props => {

    const { cart, setCart } = useContext(DataContext);

    const auth = useAuth();
    

    const { data: user } = useUser();
    const { signinStatus } = useSigninCheck();  

    const db = useDatabase();

    const signin = async () => {
        let provider = new GoogleAuthProvider();
        let u = await signInWithPopup(auth, provider);
        console.log(u);
        return u
    }
    const signout = async () => {
        await signOut(auth);
        setCart({size:0, total:0, products: {}})
    }

    useEffect(() => {
        if (user){
            get(child(ref(db), `carts/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                  setCart(snapshot.val());
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
        }
    }, [user]);

    return (
        <div className="yfz">
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <img className="logo" src={logo1} alt="logo" width="100" ></img>
                    <Link className="nav-item nav-link active" to='/'><i class="fa-solid fa-house fa-bounce"></i>   Home</Link>
                    <Link className="nav-item nav-link active" to='/shop'><i class="fa-solid fa-shop fa-bounce"></i> Shop</Link>
                    
                    
                    {
                        signinStatus === 'loading' ?
                            <button className="btn btn-primary" disabled>Waiting. . .  to. . . .  log . . .  in</button> :
                            user ?
                                <>
                                    <span>{user.displayName}</span>
                                    <button className="btn butk" onClick={signout}>Logout</button>
                                </> :
                                <button className="btn butk" onClick={signin}>Login</button>
                    }
                    {cart.size === 0 ?
                        <span id="r-span"><Link className="nav-item nav-link active" to='/shop'></Link></span> :
                        <span id="r-span"><Link className="nav-item nav-link active" to='/cart'>{cart.size} - ${cart.total.toFixed(2)} <i class="fa-solid fa-cart-shopping fa-bounce"></i></Link></span>
                    }
                </div>
            </nav>
        </div>
    );
}


export default Nav;