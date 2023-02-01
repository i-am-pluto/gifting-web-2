import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ProductCard.css";
import OwlCarousel from "react-owl-carousel";
import ProductCarouselImage from "./ProductCarouselImage";

function ProductCard({ product, varients }) {
  const productInfo = product.description;
  const productTitle = product.product_name;
  const image = product.main_image_url;
  const productSubtitle = product.artist.artist_name;
  const productImage = product.main_image_url;
  const productPrice = 0;

  const product_images = [productImage, ...product.gift_image_urls];

  const [currPrice, setCurrPrice] = useState(0);

  useEffect(() => {
    if (varients && varients.length && varients[0]) {
      setCurrPrice(varients[0].varient_price);
    }
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

  const handleAddToCart = async (e) => {
    e.preventDefault();

    const textArea = document.getElementById("custom-message-textArea");

    let message = "";
    if (textArea.attributes.disabled) {
      message = textArea.value;
    }

    if (!isCustomization() && !message.length) {
      alert("Must Attach The Customization");
      textArea.scrollIntoView();
      return;
    }

    const varientSelect = document.getElementById("varient-select-product");
    const body = {
      productid: product._id,
      customization: message,
      varient: varients[Number(varientSelect.value)],
    };

    const response = await fetch(`http://localhost:5000/api/cart/add`, {
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

    if (data._id) {
      history.push(`/cart/${data._id}`);
    } else {
      alert("Something Went Wrong");
    }
  };

  return (
    <div style={{ marginTop: "120px" }} className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          {/* <img src={productImage} height="100%" width="100%" /> */}

          <div>
            <section>
              <div className="">
                <div className="container-xl">
                  <div className="row">
                    <div className="col-md-12 owl-carousel-margin-set">
                      <OwlCarousel
                        classNameName="owl-theme"
                        nav={true}
                        margin={10}
                        // autoplay={false}
                        // dots={true}
                        // autoplayHoverPause={true}
                        items={1}
                        loop={true}
                        navText={[
                          "<span class='ion-ios-arrow-back'></span>",
                          "<span class='ion-ios-arrow-forward'></span>",
                        ]}
                      >
                        {product_images.map((el, i) => {
                          return <ProductCarouselImage product={el} />;
                        })}
                      </OwlCarousel>
                      <div
                        className="img-zoom-result-div btn"
                        onClick={(e) => {
                          document
                            .getElementById("zoom-product-image")
                            .removeAttribute("src");
                          document
                            .getElementById("zoom-product-image")
                            .style.zIndex("-1");
                        }}
                      >
                        <img id="zoom-product-image" class="img-zoom-result" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <h1>{productTitle}</h1>
            <p style={{ marginTop: "-20px" }}>
              <i>{productSubtitle}</i>
            </p>
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
                if (el) return <option value={i}>{el.varient_name}</option>;
              })}
            </select>
          </div>
          <div className="row">
            {" "}
            <div className="col">
              <div class="">
                <p className="btn" style={{ fontSize: "30px" }}>
                  <b>
                    {" "}
                    ₹<span>{currPrice}</span>
                  </b>{" "}
                </p>
                <br />
              </div>
              <div className="col">
                <div className="d-flex" style={{ marginTop: "-10px" }}>
                  <button
                    type="button"
                    className="btn btn-outline-success flex-shrink-0 mr-3"
                    onClick={handleBuyNow}
                  >
                    Buy Now <i class="fa-solid fas fa-money-check"></i>
                  </button>

                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={handleAddToCart}
                  >
                    Add to cart <i class="fa-solid fa-cart-shopping"></i>
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
