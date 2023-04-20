import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import '../css/cart.css';
import { useDatabase, useUser } from "reactfire";
import { set, ref } from "firebase/database";
import { Link } from "react-router-dom";


const Cart = () => {

    const db = useDatabase();
    const { data: user } = useUser();

    const { cart, setCart } = useContext(DataContext);

    const clearCart = () => {
        if (user) {
            set(ref(db, 'carts/' + user.uid), null);
        }
        setCart({ size: 0, total: 0, products: {} });

    }

    const increaseQuantity = id => {
        let copyCart = { ...cart };
        copyCart.size++;
        copyCart.total += copyCart.products[id].data.price;
        copyCart.products[id].quantity++;
        if (user) {
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart);
    }

    const decreaseQuantity = id => {
        let copyCart = { ...cart };
        copyCart.size--;
        copyCart.total -= copyCart.products[id].data.price;
        copyCart.products[id].quantity > 1 ?
            copyCart.products[id].quantity-- :
            delete copyCart.products[id];
        if (user) {
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart)
    }
    const removeItem = id => {
        let copyCart = { ...cart };
        copyCart.size -= copyCart.products[id].quantity;
        copyCart.total -= copyCart.products[id].quantity * copyCart.products[id].data.price;
        delete copyCart.products[id];
        if (user) {
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart)
    }

    return (
        <div className="bg1">
            <div className="out">
                <Link variant="primary"to="/checkout" className="btn btn-primary"> Checkout </Link> 
                <span></span>
                <Button variant="danger" onClick={clearCart}>
                    Clear Cart
                </Button>
                <div className="card-container" >

                    {Object.values(cart.products).map((product, index) => {
                        console.log(product);
                        return (
                            <Card className="card" style={{ width: '18rem' }} key={index}>
                                <Card.Img variant="top" src={product.data.image} className="outt" />
                                <Card.Body>
                                    <Card.Title>{product.data.title}</Card.Title>
                                    <Card.Text>
                                        <h6>Price: ${product.data.price}</h6>
                                    </Card.Text>
                                    <Button variant="secondary" id="dec-btn" onClick={() => { decreaseQuantity(product.data.id); }}><b> - 1 </b>
                                    </Button>
                                    <span id="q-span">{product.quantity}</span>
                                    <Button variant="success" id="inc-btn" onClick={() => { increaseQuantity(product.data.id); }}><b> + 1 </b></Button><br></br>
                                    <Button variant="warning" id="r-item" onClick={() => { removeItem(product.data.id); }}>remove this item</Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Cart;