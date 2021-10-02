import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Products.css'
import Rating from 'react-rating';
import { NavLink } from 'react-router-dom';

const Products = (props) => {

    const { name, img, price, seller, stock, star } = props.product;
    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt={name} />
            </div>
            <div className="">
                <h3><NavLink to={`/product/${name.replace(/\s/g, '-')}`}>{name.slice(0, 30) + '...'}</NavLink></h3>
                <p>By: {seller}</p>
                <h4>Price: {price}</h4>
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star icon-color"
                    fullSymbol="fas fa-star icon-color"
                    readonly />
                <h5>Stock: {stock}</h5>
                <button className="btn" onClick={() => props.handleAddToCart(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>
            </div>


        </div>
    );
};

export default Products;