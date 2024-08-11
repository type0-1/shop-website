import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Category() {
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/category/')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setIsLoaded(true);
            })
            .catch(err => console.error(err));
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Categories</h2>
            <ul className="list-group">
                {categories.map(category => (
                    <li key={category.shortcode} className="list-group-item">
                        <Link to={`/category/${category.shortcode}`}>{category.display_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Category;
