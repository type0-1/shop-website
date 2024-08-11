import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleStatus() {
  const { status } = useParams();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/order/?status=${status}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Orders with Status: {status}</h2>
      <ul className="list-group">
        {orders.map(order => (
          <li key={order.url} className="list-group-item">
            <div>Order ID: {order.id}</div>
            <div>Status: {order.status}</div>
            <div>Date Ordered: {new Date(order.date_ordered).toLocaleString()}</div>
            <div>Shipping Address: {order.shipping_addr}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingleStatus;
