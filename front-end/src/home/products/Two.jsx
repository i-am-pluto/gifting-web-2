import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../Carousel/assets/css/RollingCarousel.css";
import OwlCarousel from "react-owl-carousel";
import "./Two.css";
import CarouselProduct from "../Carousel/CarouselProduct";

function Two({ deviceType }) {
  let ProductData = [
    {
      productId: 2012030,
      name: "A",
      // image:
      //   "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2021/05/13/16208974262086.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012039,
      name: "A",
      // image:
      //   "https://qph.fs.quoracdn.net/main-qimg-fca749b950f305ddbf0a4cb2854b6ad1-pjlq",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012041,
      name: "Bb",
      // image:
      //   "https://thumb-lvlt.xhcdn.com/a/2nKm7fgwe2hlaWWPk1zisQ/002/255/315/526x298.4.webp",
      artistName: "SL",
      price: 200,
    },
    {
      productId: 2012046,
      name: "A",
      // image:
      //   "https://i1.sndcdn.com/artworks-PZOnPSbRx5SlcIfY-QpdgbA-t500x500.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012047,
      name: "A",
      // image:
      //   "https://qph.fs.quoracdn.net/main-qimg-fca749b950f305ddbf0a4cb2854b6ad1-pjlq",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012049,
      name: "A",
      // image:
      //   "https://i1.sndcdn.com/artworks-PZOnPSbRx5SlcIfY-QpdgbA-t500x500.jpg",
      artistName: "LR",
      price: 200,
    },
  ];

  return (
    <div>
      <section className="ftco-section">
        <div className="">
          <div className="row">
            <div className="col-md-12 text-center">
              <center>
                <h2 style={{ marginBottom: "40px", marginTop: "-50px" }}>
                  Recommended <b>Collection</b>
                </h2>
              </center>
            </div>
            <div className="container-xl">
              <div className="row">
                <div className="col-md-12">
                  <OwlCarousel
                    classNameName="owl-theme"
                    loop={true}
                    nav={true}
                    autoplay={true}
                    margin={20}
                    animateOut="fadeOut"
                    animateIn="fadeIn"
                    autoplayTimeout={1100}
                    dots={false}
                    autoplayHoverPause={true}
                    items={4}
                    navText={[
                      "<span class='ion-ios-arrow-back'></span>",
                      "<span class='ion-ios-arrow-forward'></span>",
                    ]}
                    responsive={{
                      0: {
                        items: 2,
                      },
                      600: {
                        items: 4,
                      },
                      1000: {
                        items: 6,
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default Two;
