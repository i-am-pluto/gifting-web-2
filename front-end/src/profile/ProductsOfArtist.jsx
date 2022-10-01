import React from "react";
import "./ProductsOfArtist.css";

function ProductsOfArtist({ products }) {
  // make set of 3

  let pArr = [];
  products.forEach((element, i) => {
    if (i % 3 === 0) pArr.push([element]);
    else pArr[pArr.length - 1].push(element);
  });

  return (
    <div className="container-xxl">
      {pArr.map((el, i) => {
        return (
          <div className="row f-flex justify-content-center">
            {el.map((el2, i2) => {
              return (
                <div className="col-md-3">
                  <div className="product-wrapper mb-45 text-center">
                    <div className="product-img-2">
                      <a
                        href={"/product/" + el2.productId}
                        className="product-link"
                        data-abc="true"
                      >
                        <img
                          src={el2.image}
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
                            href={"/product/" + el2.productId}
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
        );
      })}
    </div>
  );
}

export default ProductsOfArtist;
