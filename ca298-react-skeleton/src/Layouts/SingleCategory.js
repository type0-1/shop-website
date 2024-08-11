import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleCategoryPage() {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { shortcode } = useParams(); // Extract category shortcode from URL

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/?category=${shortcode}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data || []); // Set products to the response data
                setIsLoaded(true);
            })
            .catch(err => console.error(err));
    }, [shortcode]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Products in {shortcode}</h2>
            <ul className="list-group">
                {products && products.map(product => (
                    <li key={product.id} className="list-group-item">
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SingleCategoryPage;
