import React from "react";
import RollingCarousel from "./Carousel/RollingCarousel";
import CategoryContainer from "./categories/CategoryContainer";
import "./Home.css";
import One from "./products/One";
import Third from "./products/Third";
import Two from "./products/Two";

function Home() {
  return (
    <div>
      <div className="container-fluid">
        <div className="border">
          <CategoryContainer />
          <RollingCarousel />
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
          <One />
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
          <Two />
        </div>
      </div>
    </div>
  );
}

export default Home;
