import React from 'react';
import { useHistory } from 'react-router';
import useCart from '../../hooks/useCart/useCart';
import useProducts from '../../hooks/useProducts/useProducts';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import CartItems from '../CartItems/CartItems';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    let history = useHistory();

    const handleRemoveToCart = (product) => {
        const afterRemoveItem = cart.filter(item => item.key !== product.key);
        setCart(afterRemoveItem);
        deleteFromDb(product.key);
    }

    const handlePlaceOrder = () => {
        setCart([]);
        clearTheCart();
        history.push('/place-order');
    }
    return (
        <div style={{ display: 'flex' }}>
            <div>
                {
                    cart.length > 0 ?
                        cart.map(item => <CartItems key={item.key} product={item} handleRemoveToCart={handleRemoveToCart}></CartItems>)
                        :
                        <h1>No Order Found</h1>
                }
            </div>
            <div>
                <Cart cart={cart}>
                    <button className="btn" style={{ width: '100%' }} onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;