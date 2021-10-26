import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import OrderReview from './components/OrderReview/OrderReview';
import Shop from './components/Shop/Shop';
import NotFound from './components/NotFound/NotFound'
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Product from './components/Product/Product';
import Login from './components/Login/Login';
import AuthProvider from './components/AuthProvider/AuthProvider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
function App() {

  return (
    <div>
      <AuthProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/product/:productName">
              <Product></Product>
            </Route>
            <PrivateRoute path="/order-review">
              <OrderReview></OrderReview>
            </PrivateRoute>
            <Route path="/inventory">
              <Inventory></Inventory>
            </Route>
            <PrivateRoute path="/place-order">
              <PlaceOrder></PlaceOrder>
            </PrivateRoute>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
