import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Rating from 'react-rating';
import { useHistory, useParams } from 'react-router';
import useCart from '../../hooks/useCart/useCart';
import useProducts from '../../hooks/useProducts/useProducts';
import { addToDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import './Product.css';

const Product = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const { productName } = useParams();
    let history = useHistory();

    const convertNameWithSpace = productName.replace(/-/g, ' ');

    // const [product, setProduct] = useState([]);

    const product = products.filter(item => item.name.replace(/-/g, ' ') === convertNameWithSpace);

    const handleAddToCart = (pd) => {
        const exists = cart.find(item => item.key === pd.key);
        let newCart = [];
        if (exists) {
            const existedCart = cart.filter(item => item.key !== exists.key);
            exists.quantity += 1;
            newCart = [...existedCart, exists];
        }
        else {
            newCart = [...cart, pd];
        }
        setCart(newCart);
        addToDb(pd.key);
    }

    const handleReviewOrder = () => {
        history.push('/order-review')
    }
    return (
        <div className="Shop">
            {
                product.map(pd =>
                    <div key={pd.key} className="product-details">
                        <div>
                            <img src={pd.img} alt="" />
                        </div>
                        <div>
                            <p>Category: {pd.category}</p>
                            <h3>{pd.name}</h3>
                            <p>By: {pd.seller}</p>
                            <h4>Price: {pd.price}</h4>
                            <h4>Whole Sell Price: {pd.wholePrice}</h4>
                            <Rating
                                initialRating={pd.star}
                                emptySymbol="far fa-star icon-color"
                                fullSymbol="fas fa-star icon-color"
                                readonly />
                            <h5>Stock: {pd.stock}</h5>
                            <a href={pd.url} target="_blank">View Full Details</a>
                            <br />
                            <br />
                            <button className="btn" onClick={() => handleAddToCart(pd)}><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>
                        </div>

                    </div>
                )
            }
            <Cart cart={cart}>
                <button className="btn" style={{ width: '100%' }} onClick={handleReviewOrder}>Review Order</button>
            </Cart>
        </div>
    );
};

export default Product;