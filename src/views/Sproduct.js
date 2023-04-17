import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import { useDatabase, useUser } from "reactfire";
import { ref, set } from "firebase/database";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import '../css/sproduct.css'

const Sproduct = () => {
    const { productId } = useParams();
    const [data, setData] = useState();

    const db = useDatabase();
    const { data: user } = useUser();

    const local_url = (`http://127.0.0.1:5000/shop/${productId}`);
    console.log(local_url);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(local_url);
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log("API call failed with status:", response.status);
                }
            } catch (error) {
                console.error("Failed to fetch data from API:", error);
            }
        };

        fetchData();
    }, [local_url]);

    const loadProductData = async () => {
        try {
            const response = await axios.get(local_url);
            if (response.status === 200) {
                setData(response.data.data);
            } else {
                console.log("API call failed with status:", response.status);
            }
        } catch (error) {
            console.error("Failed to fetch data from API:", error);
        }
    }

    useEffect(() => { loadProductData(); }, [local_url]);


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

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg1">
            <div className="sview">
                <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src={data.image} className="img" />
                    <Card.Body>
                        <Card.Title className="info">{data.title}</Card.Title>
                        <Card.Text className="info1">
                            <h6>{data.description} {'\n'}</h6>
                            <h6>Price: ${data.price}</h6>
                        </Card.Text>
                        <Button href="#" className="card-link btn butk3" onClick={() => addProduct(data)}>Add to cart!</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );


};

export default Sproduct;
