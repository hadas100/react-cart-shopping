import { useState, useEffect } from 'react';
import { Navbar, Container, Button, ButtonGroup, Card, Popover, OverlayTrigger } from 'react-bootstrap';
import './Card.css'

const Cart = () => {
    const [shoppingCart, setShoppingCart] = useState([]);

    const fetchProducts = async () => {
        const url = "https://621f84f5ce99a7de193f919b.mockapi.io/api/products";
        const data = await fetch(url);
        const products = await data.json();
        return products
    }
    const loadCart = async () => {
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
    })

    const save = (tempCart) => {
        localStorage.setItem("shoppingCart", JSON.stringify(tempCart));
    }
    const increment = (productId) => {
        const tempCart = [...shoppingCart];
        const index = tempCart.findIndex(item => item.product.id === productId);
        if (index === -1) {
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
        if (index === -1) {
            return;
        }
        if (tempCart[index].quantity === 0) {
            return
        } else {
            tempCart[index].quantity--;
            tempCart[index].totalPrice -= tempCart[index].product.price

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

            sum += shoppingCart[i].totalPrice
        }
        return sum
    }
    const shoppingCarItem = () => {
        let count = 0;
        for (let i = 0; i < shoppingCart.length; i++) {

            if (shoppingCart[i].quantity > 0) {
                count++;
            }
        }
        if (count < 4 && count > 0) {
            return 4;
        }
        return Math.floor(count / 4);
    }
    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#home">Shopping</Navbar.Brand>
                        <OverlayTrigger
                            trigger="click"
                            placement='bottom'                           
                            overlay={
                                <Popover id='popover-bottom'>
                                    <Popover.Header as="h3">your cart:</Popover.Header>
                                    <Popover.Body>
                                    <p>total price: {shoppingCarItem()*0.5} </p>
                                    {

                                        shoppingCart.filter(item => item.quantity > 0).map(item => (
                                            <div key={item.product.id}>
                                                <p>{item.product.name}: {item.quantity} units, {item.totalPrice} $</p>
                                            </div>
                                        ))
                                    }
                                    <strong>total payment: {shoppingCartPrice()}</strong>
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Button variant="light"><img src='shopping-cart.png' style={{ width: "30px" }} /></Button>
                        </OverlayTrigger>
                </Container>
            </Navbar>
            <div>

                <div className='allCart'>
                    {
                        shoppingCart.map(item => (
                            <Card className="card" key={item.product.id} >
                                <Card.Img className="picture" variant="top" src={item.product.imge} />
                                <Card.Body>
                                    <Card.Title>{item.product.name}</Card.Title>
                                    <p>
                                        price: {item.product.price} $
                                    </p>
                                    <p>
                                        quantity:  {item.quantity}
                                    </p>
                                    <p>
                                        totalPrice:  {item.totalPrice} $
                                    </p>
                                    <ButtonGroup size="sm">
                                        <Button onClick={() => increment(item.product.id)}>+</Button>
                                        <Button onClick={() => decrement(item.product.id)}>-</Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        ))

                    }
                </div>
            </div>
        </div>
    )
}

export default Cart;