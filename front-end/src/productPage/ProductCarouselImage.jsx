import React from "react";

const ProductCarouselImage = ({ product }) => {
  return (
    <div class="img-zoom-container">
      <img
        src={product}
        alt=""
        srcset=""
        onClick={(e) => {
          document
            .getElementById("zoom-product-image")
            .setAttribute("src", e.currentTarget.src);
        }}
      />
    </div>
  );
};

export default ProductCarouselImage;
