import './App.css';
import { ReactDOM } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from './Layouts/Container';
import HomePage from './Layouts/HomePage';
import SecondPage from './Layouts/SecondPage';
import FourOhFour from './Layouts/FourOhFour';
import Category from './Layouts/Category';
import SingleCategoryPage from './Layouts/SingleCategory';
import OrdersPage from './Layouts/OrdersPage';
import CustomerPage from './Layouts/CustomerPage';
import CustomerOrder from './Layouts/CustomerOrder';
import SingleStatus from './Layouts/SingleStatus';
import AllOrders from './Layouts/AllOrders';
import SingleOrderPage from './Layouts/SingleOrderPage';
import AddProductPage from './Layouts/AddProductPage';

import 'bootstrap/dist/css/bootstrap.min.css';

// WHEN creating routes, make sure to place them 
// BEFORE the FourOhFour page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} >
          <Route index element={<HomePage />} />
          <Route path="secondpage" element={<SecondPage />}/>
          <Route path="category" element={<Category />}/>
          <Route path="/category/:shortcode" element={<SingleCategoryPage />}/>
          <Route path="orders" element={<OrdersPage />}/>
          <Route path="orders/:status" element={<SingleStatus/>}/>
          <Route path="customers" element={<CustomerPage />}/>
          <Route path="allorders" element={<AllOrders />}/>
          <Route path="order/:orderId" element={<SingleOrderPage/>}/>
          <Route path="addproduct/" element={<AddProductPage/>}/>
          <Route path="customers/:customerId/orders" element={<CustomerOrder />} />
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
