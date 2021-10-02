import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import './CartItems.css'
const CartItems = (props) => {
    const { name, seller, img, price, quantity } = props.product;
    const totalPrice = price * quantity;
    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={img} alt={name} />
            </div>
            <div className="cart-item-details">
                <h3>{name}</h3>
                <p>By: {seller}</p>
                <h4>Total Price: {totalPrice.toFixed(2)}</h4>
                <h5>Quantity: {quantity}</h5>
                <button className="btn" onClick={() => props.handleRemoveToCart(props.product)}><FontAwesomeIcon icon={faTrash} /> Remove To Cart</button>
            </div>
        </div>
    );
};

export default CartItems;