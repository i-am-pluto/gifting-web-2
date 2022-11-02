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
  let [reviews, setReviews] = useState();
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

  const isGiftImage = () => {
    if (product) {
      return (
        <>
          <ProductImages product={product.gift_image_urls} />
        </>
      );
    } else return <></>;
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
      return (
        <InformationTable
          infoText1={product.info1}
          infoText2={product.info2}
          informationTable={product.informationTable}
        />
      );
    } else return <></>;
  };

  return (
    <div style={{ marginTop: "50px" }}>
      {isProductCard()}
      <center>
        <h2>
          Gift <b>Images</b>
        </h2>
      </center>
      {isGiftImage()}
      <center>
        <h2>
          Information <b>Table</b>
        </h2>
      </center>
      <center>{isInformationTable()}</center>
      <center>
        <h2>
          Customize <b>Gift</b>
        </h2>
      </center>
      {/* customizations */}
      {isOptional()}
      {/* information table */}
      about the artist
      <center>
        <h2>
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
      {/* <CustomerReviews reviews={reviews} /> */}
    </div>
  );
}

export default ProductPage;
