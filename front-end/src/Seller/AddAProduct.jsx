import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./AddAProduct.css";
import ArtistCardEdit from "./ArtistCardEdit";
import InformationTableEdit from "./InformationTableEdit";
import ProductImagesEdit from "./ProductImagesEdit";
import upload from "../assets/img/uploadImage.png";

let MainImage;

function ProductCardEdit() {
  return (
    <div style={{ marginTop: "120px" }}>
      <div class="wrapper">
        <div class="product-img">
          <div
            src={upload}
            style={{
              height: "100%",
              width: "100%",
              cursor: "pointer",
              backgroundColor: "grey",
            }}
            className="zoom d-flex justify-content-center align-items-center"
            onClick={() => {
              document.getElementById("add-product-card-image").click();
            }}
          >
            <img
              src={upload}
              alt=""
              srcset=""
              id="product-img-temp"
              style={{ width: "80px" }}
            />
          </div>

          <input
            type="file"
            id="add-product-card-image"
            style={{ display: "none" }}
            onChange={(input) => {
              var reader = new FileReader();
              reader.readAsDataURL(input.target.files[0]);
              reader.onload = (e) => {
                document
                  .getElementById(`product-img-temp`)
                  .setAttribute("src", e.target.result);
                document.getElementById(`product-img-temp`).style.minWidth =
                  "100%";
                document.getElementById(`product-img-temp`).style.minHheight =
                  "100%";

                MainImage = reader.result;
              };
            }}
          />
        </div>
        <div class="product-info">
          <div class="product-text">
            <h1>
              <input
                type="text"
                name="product-name-edit"
                id="product-name-edit"
                className="form-control"
                placeholder="Product Title"
              />
            </h1>
            <h2>
              (<i>Artist Name</i>)
            </h2>
            <p className="color-dark">
              <textarea
                className="form-control"
                maxLength={200}
                placeholder="Product Description (in upto 200 words)"
                style={{ height: "100%" }}
                id="product-desc-edit"
              />
            </p>
          </div>

          <div>
            <center>
              <select name="Vareints" id="" disabled="disabled">
                <option value="">Varients</option>
              </select>
            </center>
          </div>

          {/* <p style={{ fontSize: "15px" }} className="row">
            <input
              type="number"
              name="product-price-edit"
              className="form-control col-lg-5"
              id="product-price-edit"
              placeholder="price in &#8377;"
            />
            <input
              type="number"
              name="product-stock-edit"
              className="form-control col-lg-7"
              id="product-stock-edit"
              placeholder="Number of stocks"
            />
          </p> */}

          <div class="product-price-btn">
            <div
              className="d-flex justify-content-end"
              //   style={{ marginTop: "-10px" }}
            >
              <button
                type="button"
                className="btn btn-outline-success button-buy disabled"
              >
                buy now
              </button>

              <button
                type="button"
                className="btn btn-outline-warning button-add disabled"
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddAProduct() {
  let [productImages, setProductImages] = useState([""]);
  let productId;
  let product = {};

  const InformationTable = {
    packageDimensions: "height x width x depth",
    itemWeight: "weight in kg",
    manufacture: "Artist Signature",
  };

  let [artist, setArtist] = useState({});

  const { id } = useParams();

  let history = useHistory();

  const markNotFilled = (e) => {
    e.style.borderColor = "red";
    e.scrollIntoView();
  };
  const markFilled = (e) => {
    e.style.borderColor = "green";
  };

  const handleProductSubmit = async (productBody) => {
    let seen = [];
    const body = JSON.stringify(productBody, function (key, val) {
      if (val != null && typeof val == "object") {
        if (seen.indexOf(val) >= 0) {
          return;
        }
        seen.push(val);
      }
      return val;
    });
    const response = await fetch(
      `http://localhost:5000/api/product/${id}/add`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    const data = await response.json();
    if (data.success) {
      productId = data.id;
      return true;
    } else {
      alert(data.message);
      return false;
    }
  };

  const handleMainImageSubmit = async (mainImage) => {
    const response = await fetch(
      `http://localhost:5000/api/product/${productId}/addmainimage`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainimage: mainImage }),
      }
    );
    const data = await response.json();
    return data;
  };

  const handleGiftImages = async (giftImages) => {
    for (var i = 0; i < giftImages.length; i++) {
      if (!giftImages[i].length) continue;
      const response = await fetch(
        `http://localhost:5000/api/product/${productId}/addgiftimage`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageFile: giftImages[i] }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        return data;
      }
    }
    return { success: true, message: "images submited successfully" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    InformationTable.itemWeight = document.getElementById(
      "product-info-weight-edit"
    ).value;
    InformationTable.packageDimensions = document.getElementById(
      "product-info-package-edit"
    ).value;
    InformationTable.manufacture = document.getElementById(
      "product-info-manufacture-edit"
    ).value;

    const product_name = document.getElementById("product-name-edit").value;
    const description = document.getElementById("product-desc-edit").value;
    const customization_optional = document.getElementById(
      "product-customization-check-edit"
    ).checked;
    const customization = document.getElementById(
      "product-customization-edit"
    ).value;

    const mainImage_temp = document.getElementById(
      "add-product-card-image"
    ).value;
    if (mainImage_temp) {
      console.log(mainImage_temp);
    }
    if (!product_name) {
      markNotFilled(document.getElementById("product-name-edit"));
      return;
    }
    markFilled(document.getElementById("product-name-edit"));
    if (!description) {
      markNotFilled(document.getElementById("product-desc-edit"));
      return;
    }
    markFilled(document.getElementById("product-desc-edit"));

    if (!customization_optional && !customization) {
      markNotFilled(document.getElementById("product-customization-edit"));
      return;
    }

    markFilled(document.getElementById("product-customization-edit"));
    const obj = {
      product_name,
      description,

      customization,
      customization_optional,
      info1: document.getElementById("product-info1-edit").value,
      info2: document.getElementById("product-info2-edit").value,
      informationTable: InformationTable,
    };
    product = obj;
    handleDoneSubmit();
  };

  const handleDoneSubmit = async (e) => {
    // let l = true;
    let l = await handleProductSubmit(product);
    // console.log(product);
    if (!l) {
      alert("something went wrong");
      return;
    }
    // console.log(MainImage);
    if (MainImage) l = handleMainImageSubmit(MainImage);
    if (!l) {
      alert("Something went wrong");
      return;
    }
    l = handleGiftImages(productImages);
    // console.log(productImages);
    if (!l) {
      alert("Something went wrong");
      return;
    }
    history.push(`/${productId}/varients/`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/artist/${id}/artistcard`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        setArtist(await response.json());
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "90px" }}>
        <center>
          <h1>
            <b>Product Information</b>
          </h1>
          <h6>(the fields will appear as they look on this screen)</h6>
        </center>
        <ProductCardEdit />

        <center>
          <h2>
            Gift <b>Images</b>
          </h2>
        </center>
        <ProductImagesEdit />
        <div className="container-xxl">
          <div className="row">
            {productImages.map((prod, i) => {
              return (
                <div class="product-img">
                  <div
                    src={upload}
                    style={{
                      height: "100%",
                      width: "100%",
                      cursor: "pointer",
                      backgroundColor: "grey",
                    }}
                    className="zoom d-flex justify-content-center align-items-center"
                    onClick={() => {
                      document
                        .getElementById(`add-product-card-image-${i}`)
                        .click();
                    }}
                  >
                    <img
                      src={upload}
                      alt=""
                      srcset=""
                      id={`product-img-temp-${i}`}
                      style={{ width: "80px" }}
                    />
                  </div>

                  <input
                    type="file"
                    id={`add-product-card-image-${i}`}
                    style={{ display: "none" }}
                    onChange={(input) => {
                      var reader = new FileReader();
                      reader.readAsDataURL(input.target.files[0]);
                      reader.onload = (e) => {
                        document
                          .getElementById(`product-img-temp-${i}`)
                          .setAttribute("src", e.target.result);
                        document.getElementById(
                          `product-img-temp-${i}`
                        ).style.minWidth = "100%";
                        document.getElementById(
                          `product-img-temp-${i}`
                        ).style.minHheight = "100%";

                        const temp = productImages;
                        temp[i] = reader.result;
                        setProductImages(temp);
                      };

                      reader.readAsDataURL(input.target.files[0]);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="col btn btn-outline-dark"
            id="add-product-image-button"
            onClick={(e) => {
              if (productImages.length < 4)
                setProductImages([...productImages, ""]);
              else
                document
                  .getElementById("add-product-image-button")
                  .classList.add("disabled");
            }}
          >
            Add An Image
          </button>
        </div>
        <center>
          <h2>
            Customize <b>Gift</b>
          </h2>
          <h6>
            {" "}
            <input
              type="checkbox"
              name="optional"
              id="product-customization-check-edit"
            />{" "}
            optional
          </h6>
        </center>
        {/* customizations */}
        <div className="form-outline w-100 container">
          <textarea
            className="form-control"
            id="product-customization-edit"
            placeholder="Enter Questions for The Customer Regarding Customization"
            rows="4"
            style={{ background: "#fff" }}
          ></textarea>
        </div>
        <br />
        {/* information table */}
        <center>
          <h2>
            Information <b>Table</b>
          </h2>
        </center>
        <InformationTableEdit informationTable={InformationTable} />
        {/* about the artist */}
        <center>
          <h2>
            About The <b>Artist</b>
          </h2>{" "}
        </center>
        <ArtistCardEdit Artist={artist} />
        <button onClick={handleSubmit} className="col-sm btn btn-warning">
          submit
        </button>
      </div>
    </div>
  );
}

export default AddAProduct;
