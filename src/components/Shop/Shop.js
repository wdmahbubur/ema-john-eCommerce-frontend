import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Shop.css';
import { addToDb, getStoredCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [displayProduct, setDisplayProduct] = useState([]);

    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProduct(data);
            })
    }, []);

    const [cart, setCart] = useState([]);
    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.key);
    }

    useEffect(() => {
        if (products.length) {
            const data = getStoredCart();
            const storedData = [];
            for (const key in data) {
                const storageData = products.find(product => product.key === key);
                if (storageData) {
                    storageData.quantity = data[key];
                    storedData.push(storageData)
                }
            }
            setCart(storedData)
        }

    }, [products]);

    const handleSearchProduct = event => {
        const value = (event.target.value);
        const matchedData = products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()));
        setDisplayProduct(matchedData);
    }

    return (
        <div>
            <div className="search-bar">
                <form>
                    <input type="text" className="search-input" onChange={handleSearchProduct} />
                    <button type="button" className="search-btn"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                </form>
                <a href='/#' className="shopping-cart-icon"><FontAwesomeIcon icon={faShoppingCart} ></FontAwesomeIcon>

                </a>
            </div>
            <div className="Shop">
                <div className="products-group">
                    {
                        displayProduct.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div>
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>

    );
};

export default Shop;