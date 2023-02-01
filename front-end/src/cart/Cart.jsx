import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductsOfArtist from "../profile/ProductsOfArtist";
import "./Cart.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

function Cart() {
  let [products, setProducts] = useState([]);
  let [price, setPrice] = useState([132.0]);
  let history = useHistory();

  const { cart_id } = useParams();

  const getProductData = async () => {
    const response = await fetch(`http://localhost:5000/api/cart/${cart_id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setProducts(data.cart_items);
  };

  const deleteProduct = async (e) => {
    e.preventDefault();

    const cart_item_id = products[Number(e.target.id.substring(10))]._id;
    console.log(cart_item_id);
    const response = await fetch(
      `http://localhost:5000/api/cart/${cart_id}/delete`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          cart_item_id,
          cart_id,
        }),
      }
    );
    const data = await response.json();

    if (!data.success) {
      alert("Something Went Wrong");
      return;
    }

    await getProductData();
  };

  let id;
  const handleCheckout = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/order/${cart_id}/order-cart`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!data.success) {
      alert("Something Went Wrong");
      return;
    }
    id = data.orderid;
    history.push(`/${id}/confirm`);
  };

  useEffect(() => {
    // find sum of all products
    let sum = 0;
    console.log(products);

    for (var i = 0; i < products.length; i++) {
      sum += products[i].varient_price;
    }
    setPrice(sum);
  }, [products]);

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div style={{ marginTop: "160px", marginBottom: "60px" }}>
      <div class="card">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row ">
                <div class="col-lg-10">
                  <h4>
                    Shopping <b>Cart</b>
                  </h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  {products.length}
                </div>
              </div>
            </div>
            {products.map((product, i) => {
              return (
                <div>
                  <div className="row">
                    <div className="btn col-md-10">
                      <div className="d-flex align-items-center">
                        <div
                          className="col-4"
                          onClick={(e) => {
                            e.preventDefault();
                            history.push("/product/" + product.product_id);
                          }}
                        >
                          <img
                            src={product.product_image}
                            alt=""
                            srcset=""
                            style={{
                              objectFit: "contain",
                              maxHeight: "100%",
                              maxWidth: "100%",
                            }}
                          />
                        </div>
                        <div
                          className="col-6 mt-3"
                          onClick={(e) => {
                            e.preventDefault();
                            history.push("/product/" + product.product_id);
                          }}
                        >
                          <p>
                            {" "}
                            <b style={{ fontSize: "14px" }}>
                              {product.product_name}
                            </b>
                            <br />
                            <i
                              style={{
                                fontSize: "11px",
                              }}
                            >
                              {product.artist_name}
                            </i>
                          </p>

                          <p style={{ fontSize: "10px" }}>
                            {" "}
                            <i>~ "{product.customization}"</i>
                          </p>

                          <p
                            style={{
                              fontSize: "11px",
                            }}
                          >
                            {product.varient_name}
                          </p>

                          <p>
                            <b style={{ fontSize: "14px" }}>
                              ₹ &nbsp;
                              {product.varient_price}
                            </b>
                          </p>
                        </div>
                        <div className="col-1 ml-auto mr-2">
                          <button
                            className="btn btn-outline-dark"
                            id={`cart-item-${i}`}
                            // style={{ width: "40px" }}
                            onClick={deleteProduct}
                          >
                            <i class="fa fa-times" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr />
                </div>
              );
            })}
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
            </div>
            <div
              class="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div class="col">TOTAL PRICE</div>
              <div class="col text-right">₹ {price}</div>
            </div>{" "}
            <button
              class="col mt-4 btn-dark"
              onClick={handleCheckout}
              style={{ height: "40px" }}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
