import React from "react";
import ArtistCard from "../productPage/ArtistCard";
import CustomerReviews from "../productPage/CustomerReviews";
import InformationTable from "../productPage/InformationTable";
import ProductCard from "../productPage/ProductCard";
import ProductCustomize from "../productPage/ProductCustomize";
import ProductImages from "../productPage/ProductImages";

function Preview({ product, artist, giftImages, mainImage }) {
  console.log("here");
  console.log(product);
  console.log(artist);
  const Product = product;
  const Artist = artist;
  return (
    <div style={{ marginTop: "50px" }}>
      <ProductCard Product={Product} />
      <center>
        <h2>
          Gift <b>Images</b>
        </h2>
      </center>
      <ProductImages product={giftImages} />

      <center>
        <h2>
          Customize <b>Gift</b>
        </h2>
        <h6>(optional)</h6>
      </center>

      {/* customizations */}
      <ProductCustomize />
      {/* information table */}
      <center>
        <h2>
          Information <b>Table</b>
        </h2>
      </center>
      <InformationTable
        infoText1={Product.info1}
        infoText2={Product.info2}
        informationTable={Product.informationTable}
      />
      {/* about the artist */}
      <center>
        <h2>
          About The <b>Artist</b>
        </h2>{" "}
      </center>

      <ArtistCard Artist={Artist} />
      {/* reviews carousel */}
      <center>
        <h2>
          Customer <b>Review</b>
        </h2>{" "}
      </center>
      <CustomerReviews Reviews={[""]} />
    </div>
  );
}

export default Preview;
