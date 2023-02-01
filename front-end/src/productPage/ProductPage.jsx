import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ArtistCard from "./ArtistCard";
import CustomerReviews from "./CustomerReviews";
import InformationTable from "./InformationTable";
import ProductCard from "./ProductCard";
import ProductCustomize from "./ProductCustomize";
import ProductImages from "./ProductImages";
import "./ProductPage.css";
function ProductPage() {
  let [product, setProduct] = useState();
  let [artist, setArtist] = useState();
  let [reviews, setReviews] = useState([]);
  let isArtistToProduct = false;
  const { productId } = useParams();

  const [varients, setVarients] = useState([]);

  useEffect(() => {
    document.body.style = "background: #f1faee;";
    const getProduct = async () => {
      const response = await fetch(
        `http://localhost:5000/api/product/${productId}/`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      setProduct(data);
    };

    getProduct();
  }, []);

  useEffect(() => {
    const getArtistCard = async () => {
      let data = {};
      if (product.artist) {
        const response = await fetch(
          `http://localhost:5000/api/artist/${product.artist.artist_id}/artistcard`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Credentials": "true",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        data = await response.json();
      }
      setArtist(data);
    };
    const getVarients = async () => {
      const response = await fetch(
        `http://localhost:5000/api/product/${productId}/varients`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      setVarients(data);
    };
    if (product) {
      getArtistCard();
      getVarients();
    }
  }, [product]);

  const isArtistCard = () => {
    if (artist) {
      return (
        <>
          <ArtistCard artist={artist} artist_id={product.artist.artist_id} />
        </>
      );
    } else return <></>;
  };

  const isProductCard = () => {
    if (product) {
      console.log(product.main_image_url);
      return <ProductCard product={product} varients={varients} />;
    } else return <></>;
  };

  // const isGiftImage = () => {
  //   if (product) {
  //     return (
  //       <>
  //         <ProductImages product={product.gift_image_urls} />
  //       </>
  //     );
  //   } else return <></>;
  // };

  const productDescription = () => {
    if (product && product.long_description) return product.long_description;
    else
      return " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet ornare ligula ut ornare. Sed ac massa a nisi elementum tincidunt. Donec id porta arcu. In elit est, fringilla vitae nunc non, pretium faucibus ante. Aliquam erat volutpat. Ut volutpat, erat a finibus dignissim, nulla est laoreet felis, ut facilisis orci felis at felis. Quisque sodales, diam vitae gravida eleifend, velit purus convallis arcu, ut ornare metus nulla vitae eros. Duis lacus leo, tristique in mollis sit amet, efficitur quis leo. Phasellus placerat ullamcorper blandit. Pellentesque tempor quam ac justo aliquet mattis. Suspendisse auctor nibh sed velit vestibulum, a aliquet massa ultrices. Cras lobortis eros ut odio mattis, id laoreet ligula semper. Phasellus sed lacinia nisi. ";
  };

  const isOptional = () => {
    if (product && product.customization_optional)
      return (
        <div>
          <center>
            <h6>(optional)</h6>
          </center>
          <ProductCustomize customization={product.customization} />;
        </div>
      );
    else if (product)
      return <ProductCustomize customization={product.customization} />;
    else return <></>;
  };

  const isInformationTable = () => {
    if (product) {
      console.log(product.informationTable);
      return <InformationTable informationTable={product.informationTable} />;
    } else return <></>;
  };

  return (
    <div>
      {isProductCard()}
      <hr className="mt-5" />
      <center>
        <h2 className="mt-5">
          Customize <b>Gift</b>
        </h2>
      </center>
      {/* customizations */}
      {isOptional()}
      {/* information table */}

      <div className="long-product-desictiption container mt-5">
        <center>
          <hr />

          <h2 className="mt-5 mb-3">
            Product <b>Description</b>
          </h2>
        </center>
        {productDescription()}
      </div>
      <center>
        <hr />
        <h2 className="mt-5">
          Information <b>Table</b>
        </h2>
      </center>
      <center className="mb-5">{isInformationTable()}</center>
      <center>
        <hr />
        <h2 className="mt-5">
          About The <b>Artist</b>
        </h2>{" "}
      </center>
      {isArtistCard()}
      {/* reviews carousel */}
      <center>
        <h2>
          Customer <b>Review</b>
        </h2>{" "}
      </center>
      <CustomerReviews product_id={productId} />
    </div>
  );
}

export default ProductPage;
