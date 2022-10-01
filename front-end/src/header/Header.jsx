import React, { useState } from "react";
import logo from "../assets/img/WorldOnpencil.png";

import "./Header.css";
import us from "../assets/img/countries/2560px-Flag_of_the_United_States.svg.png";
import ind from "../assets/img/countries/1350px-Flag_of_India.svg.png";
import SearchBar from "./SearchBar";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Header({ user }) {
  let name = "Sign in";
  if (user.name) {
    name = user.name.f_name;
  }
  // console.log(user);
  let history = useHistory();
  let user_link = "login";
  let wishlist = "login";
  let purchaseHistory = "login";
  if (user._id) {
    user_link = `user/${user._id}`;
    wishlist = `${user._id}/wishlist`;
    purchaseHistory = `${user._id}/orders`;
  }

  return (
    <div className="navbar navbar-dark bg-dark container-fluid  fixed-top">
      {/* // header logo */}
      <div className="header__option header_ob">
        <a className="brand" style={{ textAlign: "center" }} href="/">
          World On Pencil
        </a>
      </div>
      <div className="flexbox">
        <div className="flexbox_item"></div>
      </div>
      <SearchBar />
      <div className="flexbox">
        <div className="flexbox_item"></div>
      </div>
      <div className="header__nav">
        <a href={`/${purchaseHistory}`}>
          <div className="header__option header_ob">
            <span className="header__optionLineOne">Purchase</span>
            <span className="header__optionLineTwo">History</span>
          </div>
        </a>
        <a href={`/${wishlist}`}>
          <div className="header__option header_ob">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">WishList</span>
          </div>
        </a>
        {/* // sign in */}
        <a href={`/${user_link}`}>
          <div
            className="header__option header_ob"
            style={{ backgroundColor: "transparent" }}
          >
            <span className="header__optionLineOne">Welcome</span>
            <span className="header__optionLineTwo">{name}</span>
          </div>
        </a>
        {/* // cart */}
        <div className="header__optionBasket header_ob">
          <span className="header__optionLineOne">
            <FontAwesomeIcon icon={faShoppingBasket} />
          </span>
          <span
            className="header__optionLineTwo header__basketCount"
            id="shopping-cart-count-main"
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
