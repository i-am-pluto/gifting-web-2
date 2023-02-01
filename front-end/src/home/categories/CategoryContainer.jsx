import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./assets/css/categoryContainer.css";

function CategoryContainer() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    getTopArtists();
  }, []);

  const getTopArtists = async () => {
    const response = await fetch(
      "http://localhost:5000/api/artist/bestselling",
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
    setCats(data.slice(0, 4));
  };
  console.log(cats);
  return (
    <div>
      <div className="container-wrap container-fluid">
        <div className="col-md-12 mt-4">
          <center>
            <h2 className="heading-section">
              {" "}
              "Gifting with love, crafted by hand" <br />{" "}
            </h2>
            <h6>
              <i>~ Artisans & Co.</i>
            </h6>
          </center>
        </div>
        <div className="blockCat">
          <div className="container">
            <div className="d-flex justify-content-center">
              {cats.map((cat, i) => {
                return (
                  // <div className="category-parent">
                  <a href={`/profile/${cat.id}`}>
                    <div className="col-sm category_parent d-flex flex-column align-items-center btn">
                      <div className="category_item">
                        <img
                          src={cat.pfp_url}
                          alt=""
                          srcset=""
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                        />
                      </div>
                      <div href="" className="category-item category-link">
                        {cat.artist_name}
                      </div>
                    </div>
                  </a>
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
