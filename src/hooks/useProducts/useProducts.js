import { useState, useEffect } from "react";

const useProducts = (page, size) => {
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
            })
    }, [page])
    return { products, pageCount };
}
export default useProducts;