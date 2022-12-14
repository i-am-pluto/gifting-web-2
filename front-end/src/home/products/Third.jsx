import React from "react";
import "./one.css";
function Third() {
  let ProductData = [
    {
      productId: 2012030,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012039,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012041,
      name: "Bj",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "SL",
      price: 200,
    },
    {
      productId: 2012046,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012047,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012049,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012047,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012049,
      name: "Ass",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "LR",
      price: 200,
    },
  ];

  return (
    <div>
      <center>
        <h2 style={{ marginBottom: "50px", marginTop: "50px" }}>
          New <b>Collections</b>
        </h2>
      </center>

      <div className="container-xl d-flex justify-content-center">
        <div className="row">
          {ProductData.map((product) => {
            return (
              <div className="col-md-3">
                <div className="product-wrapper mb-45 text-center">
                  <div className="product-img-2">
                    <a
                      href={"/product" + product.productId}
                      className="product-link"
                      data-abc="true"
                    >
                      <img
                        src={product.image}
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      ></img>
                    </a>
                    <span>
                      <i className="fa fa-rupee"></i> 41,000
                    </span>
                    <div className="product-action">
                      <div className="product-action-style">
                        <a
                          className="action-heart"
                          title="Wishlist"
                          href="/wishlist"
                          data-abc="true"
                        >
                          {" "}
                          <i className="fa fa-heart"></i>{" "}
                        </a>
                        <a
                          className="action-cart"
                          title="Buy"
                          href={"/product/" + product.productId}
                          data-abc="true"
                        >
                          <i className="fa fa-shopping-cart"></i>{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Third;
