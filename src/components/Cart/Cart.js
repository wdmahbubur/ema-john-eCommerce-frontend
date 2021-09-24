import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const { cart } = props;

    // let total = cart.reduce((previous, product) => previous + product.price, 0);

    let totalProductQuantity = 0;
    let total = 0;
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        total += product.price * product.quantity;
        totalProductQuantity += product.quantity;
    }

    const shippingCost = 15;
    const tax = (total + shippingCost) / 10;
    const GrandTotal = total + shippingCost + tax;

    return (
        <div className="cart">
            <h2>Order Summary</h2>
            <h4>Order: {totalProductQuantity}</h4>
            <h4>Total: {total.toFixed(2)}</h4>
            <h4>Shipping Cost: {shippingCost}</h4>
            <h4>Tax: {tax.toFixed(2)}</h4>
            <h3>Grand Total: {GrandTotal.toFixed(2)}</h3>
        </div>
    );
};

export default Cart;