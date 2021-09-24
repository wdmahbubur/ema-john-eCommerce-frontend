import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Products.css'
import Rating from 'react-rating';

const Product = (props) => {
    const { name, img, price, seller, stock } = props.product;
    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt={name} />
            </div>
            <div className="product-details">
                <h3>{name.slice(0, 30) + '...'}</h3>
                <p>By: {seller}</p>
                <h4>Price: {price}</h4>
                <Rating
                    emptySymbol="far fa-star"
                    fullSymbol="fas fa-star icon-color"
                    readonly></Rating>
                <h5>Stock: {stock}</h5>
                <button className="addToCart-btn" onClick={() => props.handleAddToCart(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>
            </div>


        </div>
    );
};

export default Product;