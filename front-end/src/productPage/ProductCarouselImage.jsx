import React from "react";

const ProductCarouselImage = ({ product }) => {
  return (
    <div>
      <img
        src={product}
        alt=""
        srcset=""
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          objectFit: "cover",
          boxShadow: "4px 4px 4px 4px",
        }}
      />
    </div>
  );
};

export default ProductCarouselImage;
