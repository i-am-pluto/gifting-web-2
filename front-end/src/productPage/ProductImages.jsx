import React from "react";
import "./productImages.css";

function ProductImages({ product }) {
  return (
    <div className="container-xxl">
      <div className="row">
        {product.map((prod) => {
          return (
            <div className="col product-image-div">
              <img src={prod} alt="" className="product-image" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductImages;
