import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./assets/css/RollingCarousel.css";
import OwlCarousel from "react-owl-carousel";
import img from "./assets/img/image.png";
import CarouselProduct from "./CarouselProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RollingCarousel({ user, products }) {
  let ProductData = products;
  const [guest, setGuest] = useState("Guest");

  useEffect(() => {
    if (user.name) {
      setGuest(user.name.f_name);
    }
  }, [user]);

  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <center>
                <h2 style={{ marginBottom: "40px", marginTop: "-50px" }}>
                  Welcome <b>{guest}</b>
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
