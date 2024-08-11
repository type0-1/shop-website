import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all orders
    fetch('http://127.0.0.1:8000/api/order/')
      .then(response => response.json())
      .then(data => {
        // Extract order ID from URL and add it to each order object
        const updatedOrders = data.map(order => {
          const orderId = order.url.split('/').slice(-2, -1)[0];
          return { ...order, id: orderId };
        });
        setOrders(updatedOrders);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>All Orders</h1>
      <ul className="list-group">
        {orders.map(order => (
          <li key={order.url} className="list-group-item">
            <div>Order ID: {order.id}</div>
            <div>Date Ordered: {new Date(order.date_ordered).toLocaleString()}</div>
            <div>Status: {order.status}</div>
            {/* Corrected the link to individual order details */}
            <Link to={`/order/${order.id}`} className="btn btn-primary">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllOrdersPage;
