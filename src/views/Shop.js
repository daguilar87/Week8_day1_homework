import { useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import { useDatabase, useUser } from "reactfire";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import '../css/shop.css'


const Shop = () => {


    const db = useDatabase();
    const { data: user } = useUser();

    const local_url = 'http://127.0.0.1:5000/shop';
    console.log(local_url);


    const getProductData = async () => {
        let response = await axios.get(local_url);
        return response.status === 200 ? response.data : null
    }

    const loadProductData = async () => {
        let data = await getProductData();
        console.log(data, typeof data);
        setProducts(data.data)

    }

    const [products, setProducts] = useState(() => loadProductData());

    const { cart, setCart } = useContext(DataContext);

    const addProduct = (product) => {
        let copyCart = { ...cart }
        copyCart.size++;
        copyCart.total += product.price;
        copyCart.products[product.id] ?
            copyCart.products[product.id].quantity++
            :
            copyCart.products[product.id] = { data: product, quantity: 1 };
        console.log(copyCart);
        if (user) {
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart)
    }


    return (
        <div className="bg">
            <div className="container bgs">

                <div className="row">
                    {/* this is where we'll throw in a bootstrap for each product */  console.log(products, typeof products)}
                    {typeof products === 'object' && !products.then ? products.map((product, index) => {
                        return <div className="card m-4 border border-4" key={index} style={{ width: 18 + 'rem' }}>
                            <img src={product.image} className="card-img-top mt-3 rounded pic" alt={product.title} />
                            <div className="card-body">
                                <h3>{product.title}</h3>
                                <h5 className="card-title">Price: ${product.price}</h5>
                                <p className="card-text">{product.description}</p>
                            </div>
                            <div className="card-body">
                                <button href="#" className="card-link btn butk1" onClick={() => addProduct(product)}>Add to cart!</button>
                                <Link to={`/Sproduct/${product.id}`} className="card-link btn butk"> View Item</Link>



                            </div>
                        </div>
                    }) :
                        <h3> We're out finding all the products. . .</h3>
                    }


                </div>
            </div>
        </div>
    );
}

export default Shop;