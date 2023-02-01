import React, { useState } from "react";
import logo from "../assets/img/WorldOnpencil.png";

import "./Header.css";
import us from "../assets/img/countries/2560px-Flag_of_the_United_States.svg.png";
import ind from "../assets/img/countries/1350px-Flag_of_India.svg.png";
import SearchBar from "./SearchBar";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import ReactDOM from "react-dom";

function Header({ user }) {
  let name = "Sign in";
  if (user.name) {
    name = user.name.f_name;
  }
  const [cart, setCart] = useState({
    link: "/login",
    count: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    if (user.name) {
      setIsLoggedIn(true);
      setIsArtist(user.artist);
      setIsCustomer(user.customer);
    }
  }, [user]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("http://localhost:5000/api/cart/", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data._id) {
        setCart({
          link: "/cart/" + data._id,
          count: data.cart_items.length,
        });
      }
      console.log(data);
    };
    fetchCart();
  }, []);
  // console.log(user);
  let history = useHistory();
  let user_link = "login";
  let wishlist = "login";

  let [[height, setHeight], [width, setWidth]] = [
    useState(window.innerHeight),
    useState(window.innerWidth),
  ];
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setHeight(Number(window.innerHeight));
      setWidth(Number(window.innerWidth));
    });
  }, []);

  const processList = (e, data) => {
    closeAllPLists();
    const a = document.createElement("DIV");
    a.setAttribute("id", e.target.id + "profile-list");
    a.setAttribute("class", "profile-list");

    e.target.parentNode.appendChild(a);

    let artistbutton;
    if (isArtist)
      artistbutton = (
        <div
          className="row"
          onClick={(e) => {
            window.location.href = `/user/${user._id}/artist`;
          }}
        >
          <section className=" mt-3">
            {" "}
            <i> View Artist Profile</i>
          </section>
        </div>
      );
    else
      artistbutton = (
        <div
          className="row"
          onClick={async (e) => {
            const response = await fetch(
              "http://localhost:5000/api/user/" + user._id + "/markuserartist",
              {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const body = await response.json();
            if (body.success) {
              window.location.href = `/user/${user._id}/artist`;
            }
          }}
        >
          <section className=" mt-3">
            {" "}
            <i> Become a Seller</i>
          </section>
        </div>
      );
    let customerButton;
    if (isCustomer)
      customerButton = (
        <div
          className="row"
          onClick={(e) => {
            window.location.href = `/user/${user._id}/customer`;
          }}
        >
          <section className=" mt-3">
            <i> View Customer Profile</i>
          </section>
        </div>
      );
    else
      customerButton = (
        <div
          className="row"
          onClick={async (e) => {
            const response = await fetch(
              "http://localhost:5000/api/user/" + user._id + "/markuserartist",
              {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const body = await response.json();
            if (body.success) {
              window.location.href = `/user/${user._id}/artist`;
            }
          }}
        >
          <section className=" mt-3">
            <i> Become a Customer</i>
          </section>
        </div>
      );

    const b = (
      <div
        className="col profile-list-item"
        onMouseLeave={(e) => {
          closeAllPLists();
        }}
      >
        {customerButton}
        {artistbutton}
        <div
          className="row"
          onClick={async (e) => {
            const response = await fetch(
              "http://localhost:5000/api/user/logout",
              {
                method: "GET",
                mode: "cors",
                headers: {
                  "Access-Control-Allow-Credentials": "true",
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
            const data = await response.json();
            if (data.success) {
              window.location.href = "/";
            } else alert("Failed to log u out");
          }}
        >
          <section className="mt-3">Logout</section>
        </div>
      </div>
    );

    ReactDOM.render(b, a);
    setProfileList(true);
    console.log(a);
  };
  const [profileList, setProfileList] = useState(false);
  const closeAllPLists = (elmnt) => {
    var x = document.getElementsByClassName("profile-list-item");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i]) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
    setProfileList(false);
  };

  const generateNav = () => {
    if (width < 810) {
      return (
        <>
          {" "}
          <div className="d-flex">
            <div
              className="navbar-brand"
              style={{ marginLeft: "-15px", marginRight: "30px" }}
            >
              <a
                className="btn brand text-light"
                style={{ fontSize: "13" }}
                href="/"
              >
                World On Pencil
              </a>
            </div>
            <div className="header__nav">
              <a href={`/${wishlist}`}>
                <div className="header__option header_ob">
                  <span className="header__optionLineOne1">Your</span>
                  <span className="header__optionLineTwo1">WishList</span>
                </div>
              </a>
              {/* // sign in */}
              <div
                href={`/${user_link}`}
                onClick={(e) => {
                  if (!isLoggedIn) window.location.href = "/login";
                  else if (!profileList) {
                    processList(e);
                  } else closeAllPLists();
                }}
              >
                <div
                  className="header__option header_ob"
                  style={{ backgroundColor: "transparent" }}
                >
                  <span className="header__optionLineOne">Welcome</span>
                  <span className="header__optionLineTwo">{name}</span>
                </div>
              </div>
              {/* // cart */}
              <div className="header__optionBasket header_ob ml-2">
                <a
                  href={cart.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <span className="header__optionLineOne">
                    <FontAwesomeIcon icon={faShoppingBasket} />
                  </span>
                </a>
              </div>
            </div>
          </div>
          <SearchBar width={width} />
        </>
      );
    } else {
      return (
        <>
          {" "}
          <div className="flexbox_item nav-item"></div>
          <div className="header__option">
            <a
              className=" navbar-brand"
              style={{ textAlign: "center" }}
              href="/"
            >
              World On Pencil
            </a>
          </div>
          <div className="flexbox_item nav-item"></div>
          <SearchBar width={width} />
          <div className="flexbox_item nav-item"></div>
          <div className="header__nav nav-item">
            <a href={`/${wishlist}`}>
              <div className="header__option header_ob">
                <span className="header__optionLineOne">Your</span>
                <span className="header__optionLineTwo">WishList</span>
              </div>
            </a>
            {/* // sign in */}
            <div
              href={`/${user_link}`}
              onClick={(e) => {
                if (!isLoggedIn) window.location.href = "/login";
                else {
                  processList(e);
                }
              }}
            >
              <div
                className="header__option header_ob"
                style={{ backgroundColor: "transparent" }}
              >
                <span className="header__optionLineOne">Welcome</span>
                <span className="header__optionLineTwo">{name}</span>
              </div>
            </div>
            {/* // cart */}
            <div className="header__optionBasket header_ob ml-2">
              <a
                href={cart.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                <span className="header__optionLineOne">
                  <FontAwesomeIcon icon={faShoppingBasket} />
                </span>
                <span
                  className="header__optionLineTwo header__basketCount"
                  id="shopping-cart-count-main"
                >
                  {cart.count}
                </span>
              </a>
            </div>
          </div>
          <div className="flexbox_item nav-item"></div>
        </>
      );
    }
  };

  return (
    <nav className="navbar  navbar-expand-lg  container-fluid  fixed-top">
      {/* // header logo */}

      {generateNav()}
    </nav>
  );
}

export default Header;
