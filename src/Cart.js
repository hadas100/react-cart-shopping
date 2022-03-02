import { useState, useEffect } from 'react';
import { Img } from 'react-image';
// import Button from 'react-bootstrap/Button';
import { Navbar, Container, Button, ButtonGroup, Card, Row } from 'react-bootstrap';
// import './Card.css'
// /*

const products = [
    { id: '123a', name: 'Salmon', price: 90.05 },
    { id: '123b', name: 'Wheat bread', price: 8.05 },
    { id: '123c', name: 'Full Wheat bread', price: 12.05 },
    { id: '123d', name: 'Milk', price: 10.05 },
    { id: '123e', name: 'Cheese', price: 7.05 },
    { id: '123f', name: 'Sugar', price: 8.55 },
    { id: '123g', name: 'Salt', price: 11.55 },
    { id: '123h', name: 'Flour', price: 12.55 },
    { id: '123i', name: 'Orange', price: 4.55 },
    { id: '123j', name: 'Apple', price: 5.55 },
];
// */
const Cart = () => {
    const [shoppingCart, setShoppingCart] = useState([]);

    const fetchProducts = async () => {
        const url = "https://621f84f5ce99a7de193f919b.mockapi.io/api/products";
        const data = await fetch(url);
        const products = await data.json();
        return products
    }
    const loadCart = async () => {
        // load local storage
        //use it else build cart from default (all products)
        let shoppingCart = [];
        const strData = localStorage.getItem("shoppingCart");
        const products = await fetchProducts();
        if (strData) {
            shoppingCart = JSON.parse(strData);
        } else {
            for (let i = 0; i < products.length; i++) {
                shoppingCart.push({ product: products[i], quantity: 0, totalPrice: 0 })
            }
        }
        setShoppingCart(shoppingCart);
    }

    useEffect(() => {
        loadCart();

    }, [])

    const save = (tempCart) => {
        localStorage.setItem("shoppingCart", JSON.stringify(tempCart));
    }
    const increment = (productId) => {
        const tempCart = [...shoppingCart];
        const index = tempCart.findIndex(item => item.product.id === productId);
        if (index == -1) {
            return;
        }

        tempCart[index].quantity++;
        tempCart[index].totalPrice += +tempCart[index].product.price

        setShoppingCart(tempCart);
        save(tempCart);
    }
    const decrement = (productId) => {
        const tempCart = [...shoppingCart];
        const index = tempCart.findIndex(item => item.product.id === productId);
        if (index == -1) {
            return;
        }
        if (tempCart[index].quantity === 0) {
            // tempCart.splice(index, 1);
            return
        } else {
            tempCart[index].quantity--;
            tempCart[index].totalPrice -= tempCart[index].product.price//.toPrecision(3);

        }
        setShoppingCart(tempCart);
        save(tempCart);
    }

    const remove = (productId) => {
        const tempCart = shoppingCart.filter(item => item.product.id !== productId);
        setShoppingCart(tempCart);
        save(tempCart);
    }
    const shoppingCartPrice = () => {
        let sum = 0;
        for (let i = 0; i < shoppingCart.length; i++) {

            sum += shoppingCart[i].totalPrice//.toPrecision(3);
        }
        return sum//.toFixed(2);
    }
    const shoppingCarItem = () => {
        let count = 0;
        for (let i = 0; i < shoppingCart.length; i++) {

            if (shoppingCart[i].quantity > 0) {
                count++;
            }
        }
        if (count < 4 && count > 0) {
            return 1;
        }
        return Math.floor(count / 4);
    }
    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#home">Shopping</Navbar.Brand>
                </Container>
            </Navbar>
            {/* style={{ display: 'flex', justifyContent: 'space-around' }} */}
            <div>
                
                <div style={{
                    "display": "flex",
                    "flexWrap": "wrap",
                    "marginRight": "-15px",
                    "marginLeft": "-15px"
                }}>
                    {
                        shoppingCart.map(item => (
                            <Card key={item.product.id} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.product.imge} />
                                <Card.Body>
                                    <Card.Title>{item.product.name}</Card.Title>
                                    <Card.Text>
                                        {item.product.price}
                                    </Card.Text>
                                    <Card.Text>
                                        {item.totalPrice}
                                    </Card.Text>
                                    <ButtonGroup size="sm">
                                        <Button onClick={() => increment(item.product.id)}>+</Button>
                                        {/* <Button>Middle</Button> */}
                                        <Button onClick={() => decrement(item.product.id)}>-</Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        ))

                        
                        // shoppingCart.map(item => (
                        //     <div style={{ display: 'flex', justifyContent: 'space-around' }} key={item.product.id}>
                        //         <h3 style={{ maxWidth: '10vw' }}>{item.product.name}</h3>
                        //         <p>{item.quantity}</p>
                        //         <p>{item.totalPrice}</p>
                        //         <button type="button" onClick={() => increment(item.product.id)}>+</button>
                        //         <button type="button" onClick={() => decrement(item.product.id)}>-</button>
                        //         <button type="button" onClick={() => remove(item.product.id)}>X</button>
                        //     </div>
                        // ))
                    }
                </div>
                <div>
                    <h3>total shipping: {2 * shoppingCarItem()}</h3>
                    <h3>total price: {shoppingCartPrice()}</h3>
                    <div>
                        <p>your cart:</p>
                        {

                            shoppingCart.filter(item => item.quantity > 0).map(item => (
                                <div key={item.product.id}>
                                    {/* <h3 style={{ maxWidth: '10vw' }}>{item.product.name}</h3> */}
                                    <p>{item.product.name} {item.quantity} {item.totalPrice}</p>
                                    {/* <p>{item.totalPrice}</p> */}
                                    {/* <button type="button" onClick={() => increment(item.product.id)}>+</button>
                                    <button type="button" onClick={() => decrement(item.product.id)}>-</button>
                                    <button type="button" onClick={() => remove(item.product.id)}>X</button> */}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;