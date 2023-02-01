import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Home from "./home/Home";
import WelcomeBody from "./welcome/WelcomeBody";
import SellerWelcome from "./Seller/SellerWelcome";
import ProductPage from "./productPage/ProductPage";
import Profile from "./profile/Profile";
import Cart from "./cart/Cart";
import Login from "./user/Login";
import Register from "./user/Register";
import { useEffect, useState } from "react";
import ArtistProfile from "./user/ArtistProfile";
import CustomerProfile from "./user/CustomerProfile";
import AddAProduct from "./Seller/AddAProduct";
import Role from "./user/Role";
import { Varients } from "./Seller/Varients";
import ConfirmOrder from "./orders/ConfirmOrder";
import SearchResult from "./searchResult/SearchResult";
import AddCategories from "./Seller/AddCategories";
import OrderStatus from "./orders/OrderStatus";

function App() {
  let [user, setUser] = useState({});
  useEffect(() => {
    document.body.style = "background: #f1faee;";
    fetch("http://localhost:5000/api/user/", {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <div className="App">
      <Header user={user} />
      <Router>
        <Switch>
          <Route exact path="/seller">
            <SellerWelcome />
          </Route>
          <Route exact path="/home">
            <Home user={user} />
          </Route>
          <Route exact path="/product/:productId">
            <ProductPage />
          </Route>
          <Route exact path="/profile/:profileId">
            <Profile />
          </Route>
          <Route exact path="/cart/:cart_id">
            <Cart />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/user/:id">
            <Role />
          </Route>
          <Route exact path="/user/:id/artist/">
            <ArtistProfile user={user} />
          </Route>
          <Route exact path="/user/:id/customer/">
            <CustomerProfile user={user} />
          </Route>
          <Route exact path="/user/:id/addaproduct">
            <AddAProduct />
          </Route>
          <Route exact path="/:id/varients">
            <Varients />
          </Route>

          <Route exact path="/:id/categories">
            <AddCategories />
          </Route>

          <Route exact path="/search/:pgeno">
            <SearchResult />
          </Route>

          <Route exact path="/:id/confirm">
            <ConfirmOrder />
          </Route>
          <Route exact path="/order/:id">
            <OrderStatus />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
