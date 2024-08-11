import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("D"); // Default status is "DELIVERED"
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/order/?status=${status}`)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setIsLoaded(true);
            })
            .catch(err => console.error(err));
    }, [status]);

    const handleChangeStatus = (newStatus) => {
        setStatus(newStatus);
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Orders</h2>
            <div className="btn-group mb-3" role="group">
                <button type="button" className={`btn ${status === 'O' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleChangeStatus('O')}>Ordered</button>
                <button type="button" className={`btn ${status === 'P' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleChangeStatus('P')}>Processing</button>
                <button type="button" className={`btn ${status === 'S' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleChangeStatus('S')}>Shipped</button>
                <button type="button" className={`btn ${status === 'D' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleChangeStatus('D')}>Delivered</button>
            </div>
            <ul className="list-group">
                {orders.map(order => (
                    <li key={order.id} className="list-group-item">
                        <div>Status: {order.status}</div>
                        {/* Use Link to navigate to SingleStatus page */}
                        <Link to={`/orders/${order.status}`} className="btn btn-primary">View Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrdersPage;
