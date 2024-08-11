import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SingleOrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State to store the total price
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch individual order details
    fetch(`http://127.0.0.1:8000/api/order/${orderId}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        return response.json();
      })
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [orderId]);

  useEffect(() => {
    // Fetch order items associated with the order
    fetch(`http://127.0.0.1:8000/api/orderitem/?order=${orderId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch order items');
        }
        return response.json();
      })
      .then(data => {
        setOrderItems(data);
        setLoading(false); // Set loading to false after order items are fetched
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [orderId]);

  
  useEffect(() => {
    // Calculate total price when order items change
    let totalPrice = 0;
    orderItems.forEach(item => {
      const itemQuantity = parseFloat(item.quantity);
      const itemPrice = parseFloat(item.product.price); // Parse the price to a float
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) { // Check if both price and quantity are valid numbers
        totalPrice += itemQuantity * itemPrice;
      } else {
        console.warn(`Invalid price or quantity for item: ${item.product.name}`); // Log warning for invalid price or quantity
      }
    });
    setTotalPrice(totalPrice);
  }, [orderItems]);
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Order Details</h1>
      <div>Order ID: {orderId}</div>
      <div>Date Ordered: {new Date(order.date_ordered).toLocaleString()}</div>
      <div>Status: {order.status}</div>

      <h2>Order Items</h2>
      <ul>
        {orderItems.map(item => (
          <li key={item.url}>
            <div>Quantity: {item.quantity}</div>
            {/* Fetch and display product information */}
            <ProductDetails productUrl={item.product} />
          </li>
        ))}
      </ul>

      <h2>Total Price: ${totalPrice.toFixed(2)}</h2> {/* Display total price */}
    </div>
  );
}

// Component to fetch and display product details
function ProductDetails({ productUrl }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch product details
      fetch(productUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }
          return response.json();
        })
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }, [productUrl]);
  
    if (loading) {
      return <div>Loading product...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div>
        <div>Product: {product.name}</div>
        <div>Price: ${parseFloat(product.price).toFixed(2)}</div> {/* Parse and display price properly */}
        {/* Add more product details as needed */}
      </div>
    );
  }
  
export default SingleOrderPage;
