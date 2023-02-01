import React, { useEffect } from "react";
import { useState } from "react";
import RollingCarousel from "./Carousel/RollingCarousel";
import CategoryContainer from "./categories/CategoryContainer";
import "./Home.css";
import One from "./products/One";
import Third from "./products/Third";
import Two from "./products/Two";

function Home({ user }) {
  const [homeSlider, setHomeSlider] = useState([]);
  const [mostSelling, setMostSelling] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [newCollection, setNewCollection] = useState([]);

  const getHomePage = async () => {
    const [r1, r2, r3, r4] = [
      await fetch("http://localhost:5000/api/product/featured", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      await fetch("http://localhost:5000/api/product/bestselling", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      await fetch("http://localhost:5000/api/product/new", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      await fetch("http://localhost:5000/api/product/popular", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    ];
    const data = [
      await r1.json(),
      await r2.json(),
      await r3.json(),
      await r4.json(),
    ];
    setHomeSlider(data[0]);
    setMostSelling(data[1]);
    setNewCollection(data[2]);
    setMostPopular(data[3]);
  };

  useEffect(() => {
    getHomePage();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="border">
          <CategoryContainer />
          {/* Should show the featured products that the admin wants to be shown  */}
          <RollingCarousel products={homeSlider} user={user} />
          <div
            className="container mb-5 text-center"
            style={{ marginTop: "-40px" }}
          >
            Welcome to Artisans & Co., your destination for beautifully
            handcrafted gifts that are made with love and passion. Our featured
            products are some of our most popular and unique items, each one
            created by skilled artisans who put their heart and soul into every
            piece.
          </div>
        </div>
        <div className="border">
          <One products={mostSelling} />
          <div className="container mb-5 text-center" style={{}}>
            Welcome to Artisans & Co., where we specialize in creating
            beautifully handcrafted gifts for every occasion. Our best selling
            products are perfect for showing your loved ones just how much you
            care.
          </div>
        </div>
        <div className="border">
          <Third products={newCollection} />
          <div className="container mb-5 text-center" style={{}}>
            Welcome to Artisans & Co., where we pride ourselves on offering
            beautifully handcrafted gifts that are made with love and passion.
            We are excited to announce the arrival of our latest collection,
            featuring a range of unique and stylish items that are sure to
            impress.
          </div>
        </div>
        <div className="mr-3">
          <Two products={mostPopular} />
        </div>
      </div>
    </div>
  );
}

export default Home;
