import { useState, useEffect } from "react";
import { getStoredCart } from "../../utilities/fakedb";

const useCart = (products) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
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
    }, [products])

    return [cart, setCart];
}
export default useCart;