import React, { useState, useEffect } from 'react';

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/customer/')
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Customers</h1>
      <ul>
        {customers.map(customer => (
          <li key={customer.url}>
            <h2>{customer.name}</h2>
            <p>Email: {customer.email}</p>
            <p>Address: {customer.address}</p>
            <a href={`/customers/${customer.url.split('/').slice(-2, -1)}/orders`}>View Orders</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerPage;
