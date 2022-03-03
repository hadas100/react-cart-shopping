import React from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap'

const popover = (()=>{
    let shoppingCart = [];
    const strData = localStorage.getItem("shoppingCart");
    if (strData) {
        shoppingCart = JSON.parse(strData);
    }

    <Popover id="popover-basic">
        <Popover.Header as="h3">total shipping: </Popover.Header>
        <Popover.Body>
            <div>
                <p>your cart:</p>
                {
                    shoppingCart?.filter(item => item.quantity > 0).map(item => (
                        <div key={item.product.id}>
                            <p>{item.product.name} {item.quantity} {item.totalPrice} $</p>
                        </div>
                    ))
                }
            </div>
        </Popover.Body>
    </Popover>}
);

const MyCart = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="light"><img src='shopping-cart.png' style={{ width: "20px" }} /></Button>
    </OverlayTrigger>
);

export default MyCart;