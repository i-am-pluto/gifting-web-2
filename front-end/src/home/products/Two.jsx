import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../Carousel/assets/css/RollingCarousel.css";
import OwlCarousel from "react-owl-carousel";
import "./Two.css";
import CarouselProduct from "../Carousel/CarouselProduct";
import { useState } from "react";
import { useEffect } from "react";

function Two({ products }) {
  let [ProductData, setProductData] = useState([]);

  useEffect(() => {
    setProductData(products);
  }, [products]);

  const generateDiv = () => {
    if (ProductData.length) {
      return (
        <div className="col-md-12">
          <OwlCarousel
            classNameName="owl-theme"
            loop={true}
            nav={true}
            autoplay={true}
            margin={20}
            // animateOut="fadeOut"
            // animateIn="fadeIn"
            autoplayTimeout={2000}
            dots={false}
            autoplayHoverPause={true}
            items={4}
            navText={[
              "<span class='ion-ios-arrow-back'></span>",
              "<span class='ion-ios-arrow-forward'></span>",
            ]}
            responsive={{
              0: {
                items: 1,
              },
              600: {
                items: 3,
              },
              1500: {
                items: 6,
              },
            }}
          >
            {ProductData.map((el, i) => {
              return <CarouselProduct product={el} />;
            })}
          </OwlCarousel>
        </div>
      );
    } else return <div></div>;
  };

  return (
    <div>
      <section className="ftco-section">
        <div className="">
          <div className="row">
            <div className="col-md-12 text-center">
              <center>
                <h2 style={{ marginBottom: "40px", marginTop: "-50px" }}>
                  Most <b>Popular</b>
                </h2>
              </center>
            </div>
            <div className="container-xl">
              <div className="row">{generateDiv()}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Two;
