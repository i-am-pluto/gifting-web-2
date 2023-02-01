import React from "react";
import "./one.css";
function Third({ products }) {
  let ProductData = products;
  return (
    <div>
      <center>
        <h2 style={{ marginBottom: "50px", marginTop: "50px" }}>
          New <b>Collections</b>
        </h2>
      </center>

      <div className="container-xl">
        <div className="row justify-content-center">
          {ProductData.map((product) => {
            let price = 0;
            if (product.varients && product.varients.length)
              price = product.varients[0].varient_price;
            return (
              <div className="col-3" style={{ maxWidth: "max-content" }}>
                <div className="product-wrapper mb-45 text-center">
                  <div className="product-img-2">
                    <a
                      href={"/product" + product._id}
                      className="product-link"
                      data-abc="true"
                    >
                      <img
                        src={product.main_image_url}
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      ></img>
                    </a>
                    <span>
                      <i className="fa fa-rupee"></i> {}
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
                          href={"/product/" + product._id}
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
