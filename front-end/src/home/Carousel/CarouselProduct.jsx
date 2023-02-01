import React from "react";
import img from "./assets/img/image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./assets/css/product.css";

function CarouselProduct({ product }) {
  const image = product.main_image_url;
  const name = product.product_name;
  let artistName = "";
  if (product.artist) artistName = product.artist.artist_name;
  const productId = product._id;

  return (
    <div className="item">
      <div className="work">
        <a
          href={`/product/${productId}`}
          className="icon d-flex align-items-center justify-content-center"
        >
          <div
            className="img d-flex align-items-center justify-content-center rounded"
            style={{ backgroundImage: `url("${image}")` }}
          ></div>
        </a>

        {/* product text */}
        <div className="text pt-3 w-100 text-center">
          <h3>
            <a href="#">{name}</a>
          </h3>
          <span>{artistName}</span>
        </div>
      </div>
    </div>
  );
}

export default CarouselProduct;
