import { useState, useEffect } from "react";
import { getStoredCart } from "../../utilities/fakedb";

const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedData = getStoredCart();
        const keys = Object.keys(storedData);
        fetch('http://localhost:5000/products/cartItem', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {
                if (products.length) {
                    const storedData = getStoredCart();
                    const cart = [];
                    for (const key in storedData) {
                        const storageData = products.find(product => product.key === key);
                        if (storageData) {
                            storageData.quantity = storedData[key];
                            cart.push(storageData);
                        }
                    }
                    setCart(cart);
                }
            })
    }, [])

    return [cart, setCart];
}
export default useCart;