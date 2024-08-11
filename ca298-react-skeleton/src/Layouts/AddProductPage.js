import React, { useState, useEffect } from 'react';

function AddProductPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/order/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Fetch products from the API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/product/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new order item object
    const orderItem = {
      quantity: quantity,
      product: selectedProduct,
      order: selectedOrder, // Use the selected order's URL
    };
    
    // Send a POST request to add the order item to the order
    fetch('http://127.0.0.1:8000/api/orderitem/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderItem),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add product to order');
        }
        // Reset form fields after successful addition
        setSelectedOrder('');
        setSelectedProduct('');
        setQuantity(1);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Add Product to Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="order">Select an Order:</label>
          <select
            id="order"
            className="form-control"
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
          >
            <option value="">Select an order</option>
            {orders.map(order => (
              <option key={order.url} value={order.url}>Order {new Date(order.date_ordered).toLocaleString()}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="product">Product:</label>
          <select
            id="product"
            className="form-control"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.url} value={product.url}>{product.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add to Order</button>
      </form>
    </div>
  );
}

export default AddProductPage;
