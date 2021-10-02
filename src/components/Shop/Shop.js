import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Shop.css';
import { addToDb } from '../../utilities/fakedb';
import useProducts from '../hooks/useProducts/useProducts';
import useCart from '../hooks/useCart/useCart';
import { useHistory } from 'react-router';
import Products from '../Products/Products';

const Shop = () => {
    const [products] = useProducts();
    const [displayProduct, setDisplayProduct] = useState([]);
    const [cart, setCart] = useCart(products);

    let history = useHistory();

    useEffect(() => {
        setDisplayProduct(products);
    }, [products]);


    const handleAddToCart = (product) => {
        const exists = cart.find(item => item.key === product.key);
        let newCart = [];
        if (exists) {
            const existedCart = cart.filter(item => item.key !== exists.key);
            exists.quantity += 1;
            newCart = [...existedCart, exists];
        }
        else {
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.key);
    }

    const handleSearchProduct = event => {
        const value = (event.target.value);
        const matchedData = products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()));
        setDisplayProduct(matchedData);
    }

    const handleReviewOrder = () => {
        history.push('/order-review')
    }
    return (
        <div>
            <div className="search-bar">
                <form>
                    <input type="text" className="search-input" onChange={handleSearchProduct} placeholder="Search Your Product" />
                    <button type="button" className="search-btn"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                </form>
                <a href='/#' className="shopping-cart-icon"><FontAwesomeIcon icon={faShoppingCart} ></FontAwesomeIcon>

                </a>
            </div>
            <div className="Shop">
                <div className="products-group">
                    {
                        displayProduct.map(product => <Products
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Products>)
                    }
                </div>
                <div>
                    <Cart cart={cart}>
                        <button className="btn" style={{ width: '100%' }} onClick={handleReviewOrder}>Review Order</button>
                    </Cart>
                </div>
            </div>
        </div>

    );
};

export default Shop;