import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ProductCard.css";
function ProductCard({ product }) {
  const productInfo = product.description;
  const productTitle = product.product_name;
  const image = product.main_image_url;
  const productSubtitle = product.artist_name;
  const productImage = product.main_image_url;
  const productPrice = 0;

  const varients = product.varients;

  const [currPrice, setCurrPrice] = useState(0);

  useEffect(() => {
    setCurrPrice(varients[0].varient_price);
  }, [varients]);

  let history = useHistory();

  const isCustomization = () => {
    if (product.customization_optional) {
      return true;
    } else return false;
  };

  const handleBuyNow = async () => {
    const textArea = document.getElementById("custom-message-textArea");

    let message = "";
    if (textArea.attributes.disabled) {
      message = textArea.value;
    }

    if (!isCustomization() && !message.length) {
      alert("Must Attach The Customization");
      textArea.scrollIntoView();
    }

    // initiate order

    const varientSelect = document.getElementById("varient-select-product");
    const body = {
      productid: product._id,
      customization: message,
      varient: varients[Number(varientSelect.value)],
    };

    const response = await fetch(`http://localhost:5000/api/order/create`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.success) {
      history.push(`/${data.orderid}/confirm`);
    } else {
      alert("Something Went Wrong");
    }
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <div class="wrapper">
        <div class="product-img">
          <img src={productImage} height="100%" width="100%" />
        </div>
        <div class="product-info">
          <div class="product-text">
            <h1>{productTitle}</h1>
            <h2>{productSubtitle}</h2>
            <p className="color-dark">{productInfo}</p>
          </div>
          +
          <div className="d-flex justify-content-end mr-3 ml-3">
            <select
              name="varientSelect"
              id="varient-select-product"
              className="form-select form-select-sm "
              onChange={(e) => {
                setCurrPrice(varients[Number(e.target.value)].varient_price);
              }}
            >
              {varients.map((el, i) => {
                return <option value={i}>{el.varient_name}</option>;
              })}
            </select>
          </div>
          <div className="row">
            {" "}
            <div className="col">
              <div class="product-price-btn">
                <p className="btn">
                  ₹<span>{currPrice}</span>
                </p>
                <br />
              </div>
              <div className="col">
                <div
                  className="d-flex justify-content-end"
                  style={{ marginTop: "-10px" }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-success button-buy"
                    onClick={handleBuyNow}
                  >
                    buy now
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-warning button-add"
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
