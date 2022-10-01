import React from "react";
import "./assets/css/categoryContainer.css";

function CategoryContainer() {
  let cats = new Array();
  cats = [1, 2, 3, 4];

  return (
    <div>
      <div className="container-wrap container-fluid">
        <div className="col-md-12 text-center m-4">
          <h2 className="heading-section">
            {" "}
            Find things you'll love. Support independent sellers. Only on Etsy.{" "}
          </h2>
        </div>
        <div className="blockCat">
          <div className="container">
            <div className="row ">
              {cats.map((cat) => {
                return (
                  // <div className="category-parent">
                  <div className="col-sm category_parent d-flex flex-column align-items-center">
                    <div className="category_item"></div>
                    <div href="" className="category-item category-link">
                      #category
                    </div>
                  </div>
                  // </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryContainer;
