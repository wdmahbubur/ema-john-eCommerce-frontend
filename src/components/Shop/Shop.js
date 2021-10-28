import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Shop.css';
import { addToDb } from '../../utilities/fakedb';
import { useHistory } from 'react-router';
import Products from '../Products/Products';
import useProducts from '../../hooks/useProducts/useProducts';
import useCart from '../../hooks/useCart/useCart';

const Shop = () => {
    const [page, setPage] = useState(0);
    const size = 10;
    const { products, pageCount } = useProducts(page, size);
    const [displayProduct, setDisplayProduct] = useState([]);
    const [cart, setCart] = useCart();

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
                <div>
                    <div className="products-group">
                        {
                            displayProduct.map(product => <Products
                                key={product.key}
                                product={product}
                                handleAddToCart={handleAddToCart}
                            ></Products>)
                        }
                    </div>
                    <div className="pagination">
                        {
                            [...Array(pageCount).keys()].map(pageNum => <button className={
                                page === pageNum ? 'selected' : ''
                            } key={pageNum} onClick={() => setPage(pageNum)}>{pageNum + 1}</button>)
                        }
                    </div>
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