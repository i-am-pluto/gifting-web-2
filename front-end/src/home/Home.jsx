import React, { useEffect } from "react";
import { useState } from "react";
import RollingCarousel from "./Carousel/RollingCarousel";
import CategoryContainer from "./categories/CategoryContainer";
import "./Home.css";
import One from "./products/One";
import Third from "./products/Third";
import Two from "./products/Two";

function Home() {
  const [homeSlider, setHomeSlider] = useState([]);
  const [mostSelling, setMostSelling] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);

  const getHomePage = async () => {
    const response = await fetch("http://localhost:5000/api/home/", {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setHomeSlider(data.homeSlider);
    setMostPopular(data.mostPopular);
    setMostSelling(data.mostSelling);
  };

  useEffect(() => {
    getHomePage();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="border">
          <CategoryContainer />
          <RollingCarousel products={homeSlider} />
          <div className="container mb-5" style={{ marginTop: "-40px" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
            aperiam eius esse rem obcaecati quam, tempore quo fugiat officiis
            sapiente architecto deleniti illum distinctio soluta suscipit libero
            ab reiciendis eligendi. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Iure veritatis assumenda debitis. Optio, quaerat!
            Provident blanditiis voluptatum omnis nesciunt, qui quos aperiam eos
            tempora ab commodi eligendi quam cumque numquam.
          </div>
        </div>
        <div className="border">
          <One products={mostSelling} />
          <div className="container mb-5" style={{ marginTop: "-40px" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
            aperiam eius esse rem obcaecati quam, tempore quo fugiat officiis
            sapiente architecto deleniti illum distinctio soluta suscipit libero
            ab reiciendis eligendi. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Iure veritatis assumenda debitis. Optio, quaerat!
            Provident blanditiis voluptatum omnis nesciunt, qui quos aperiam eos
            tempora ab commodi eligendi quam cumque numquam.
          </div>
        </div>
        <div className="border">
          <Third />
          <div className="container mb-5" style={{ marginTop: "-40px" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
            aperiam eius esse rem obcaecati quam, tempore quo fugiat officiis
            sapiente architecto deleniti illum distinctio soluta suscipit libero
            ab reiciendis eligendi. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Iure veritatis assumenda debitis. Optio, quaerat!
            Provident blanditiis voluptatum omnis nesciunt, qui quos aperiam eos
            tempora ab commodi eligendi quam cumque numquam.
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
