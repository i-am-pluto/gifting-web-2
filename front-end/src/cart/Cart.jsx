import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductsOfArtist from "../profile/ProductsOfArtist";
import "./Cart.css";

function Cart() {
  let [products, setProducts] = useState([
    {
      productId: 2012030,
      name: "A",
      // image:
      //   "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2021/05/13/16208974262086.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012039,
      name: "A",
      // image:
      //   "https://qph.fs.quoracdn.net/main-qimg-fca749b950f305ddbf0a4cb2854b6ad1-pjlq",
      artistName: "Rs",
      price: 200,
    },
    {
      productId: 2012041,
      name: "Bb",
      // image:
      //   "https://thumb-lvlt.xhcdn.com/a/2nKm7fgwe2hlaWWPk1zisQ/002/255/315/526x298.4.webp",
      artistName: "SL",
      price: 200,
    },
    {
      productId: 2012046,
      name: "A",
      // image:
      //   "https://i1.sndcdn.com/artworks-PZOnPSbRx5SlcIfY-QpdgbA-t500x500.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012047,
      name: "A",
      // image:
      //   "https://qph.fs.quoracdn.net/main-qimg-fca749b950f305ddbf0a4cb2854b6ad1-pjlq",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012049,
      name: "A",
      // image:
      //   "https://i1.sndcdn.com/artworks-PZOnPSbRx5SlcIfY-QpdgbA-t500x500.jpg",
      artistName: "LR",
      price: 200,
    },
  ]);
  let [price, setPrice] = useState([132.0]);

  function deleteProduct(e) {
    let id = e.target.id;
    id = id.substring(13);
    console.log(id);
    let newProducts = [...products];
    newProducts.splice(Number(id), 1);
    setProducts(newProducts);
  }

  useEffect(() => {
    // find sum of all products
    let sum = 0;
    for (var product in products) {
      sum += product.price;
    }
    setPrice(sum);
  }, []);

  return (
    <div style={{ marginTop: "120px", marginBottom: "60px" }}>
      <div class="card">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  {products.length}
                </div>
              </div>
            </div>
            {products.map((e, i) => {
              return (
                <div class="row">
                  <div class="row main align-items-center">
                    <div class="col-2">
                      <img class="img-s img-fluid" src={e.image} />
                    </div>
                    <div class="col">
                      <div class="row text-muted">{e.artistName}</div>
                      <div class="row">
                        {e.name} - {i}
                      </div>
                    </div>
                    <div class="col">
                      {" "}
                      <a href="#" className="text-a">
                        -
                      </a>
                      <a href="#" className="text-a count-prod">
                        1
                      </a>
                      <a href="#" className="text-a">
                        +
                      </a>{" "}
                    </div>
                    <div class="col">
                      &euro; {e.price}
                      <span
                        class="close btn"
                        id={`deleteButton-${i}`}
                        onClick={deleteProduct}
                      >
                        &#10005;
                      </span>
                    </div>
                  </div>
                  <hr className="hr-line" />
                </div>
              );
            })}
            <div class="back-to-shop">
              <a href="#">
                <i className="fa fa-arrow-left"></i>
              </a>
              <span class="text-muted ml-2">Back</span>
            </div>
          </div>
          <div class="col-md-4 summary">
            <div>
              <h5 className="h5-line">
                <b>Summary</b>
              </h5>
            </div>
            <hr className="hr-line" />
            <div class="row p-3">
              <div class="col" style={{ paddingLeft: "0px" }}>
                ITEMS {products.length}
              </div>
              <div class="col text-right">&euro; {price}</div>
            </div>
            <form className="form-summary">
              <p>SHIPPING</p>{" "}
              <select className="select-cart">
                <option class="text-muted">
                  Standard-Delivery- &euro;5.00
                </option>
              </select>
              <p>GIVE CODE</p>{" "}
              <input
                className="input-cart"
                id="code"
                placeholder="Enter your code"
              />
            </form>
            <div
              class="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div class="col">TOTAL PRICE</div>
              <div class="col text-right">&euro; 137.00</div>
            </div>{" "}
            <button class="checkout-btn">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
