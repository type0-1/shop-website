import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CustomerOrder() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch customer details
    fetch(`http://127.0.0.1:8000/api/customer/${customerId}/`)
      .then(response => response.json())
      .then(data => {
        setCustomer(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching customer details:', error));

    // Fetch customer's orders
    fetch(`http://127.0.0.1:8000/api/order/?customer=${customerId}`)
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => console.error('Error fetching customer orders:', error));
  }, [customerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Customer Details</h1>
      <h2>Name: {customer.name}</h2>
      <p>Email: {customer.email}</p>
      <p>Address: {customer.address}</p>

      <h2>Orders</h2>
      {orders.length > 0 ? (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order.id} className="list-group-item">
              <div>Order ID: {order.id}</div>
              <div>Date Ordered: {new Date(order.date_ordered).toLocaleString()}</div>
              <div>Status: {order.status}</div>
              <div>Shipping Address: {order.shipping_addr}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No orders found for this customer.</div>
      )}

      <Link to="/customers" className="btn btn-primary mt-3">Back to Customers</Link>
    </div>
  );
}

export default CustomerOrder;
