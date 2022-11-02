import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./assets/css/RollingCarousel.css";
import OwlCarousel from "react-owl-carousel";
import img from "./assets/img/image.png";
import CarouselProduct from "./CarouselProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RollingCarousel() {
  let ProductData = [
    {
      productId: 2012030,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012039,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012041,
      name: "Bb",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "Sunny Leone",
      price: 200,
    },
    {
      productId: 2012046,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012047,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012049,
      name: "A",
      image:
        "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg",
      artistName: "LR",
      price: 200,
    },
  ];

  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <center>
                <h2 style={{ marginBottom: "40px", marginTop: "-50px" }}>
                  Welcome <b>Guest</b>
                </h2>
              </center>
            </div>
            <div className="col-md-12">
              <OwlCarousel
                classNameName="owl-theme"
                loop={true}
                nav={true}
                autoplay={true}
                margin={30}
                animateOut="fadeOut"
                animateIn="fadeIn"
                dots={true}
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
                    items: 2,
                  },
                  1000: {
                    items: 3,
                  },
                }}
              >
                {ProductData.map((el, i) => {
                  return <CarouselProduct product={el} />;
                })}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RollingCarousel;
