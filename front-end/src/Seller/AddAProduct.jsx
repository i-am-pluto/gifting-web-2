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
  let [productImages, setProductImages] = useState([""]);

  return (
    <div style={{ marginTop: "80px" }} className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <section>
            <div className="">
              <div className="container-xl ml-auto mr-auto">
                <div className="row d-flex align-items-center">
                  <div
                    src={upload}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      height: "100%",
                      border: "1px dotted grey",
                    }}
                    className="d-flex justify-content-center align-items-center row "
                    onClick={() => {
                      document.getElementById("add-product-card-image").click();
                    }}
                  >
                    <img
                      src={upload}
                      alt=""
                      srcset=""
                      id="product-img-temp"
                      style={{ width: "100%" }}
                    />

                    <input
                      type="file"
                      id="add-product-card-image"
                      style={{ display: "none" }}
                      onChange={(input) => {
                        var reader = new FileReader();
                        reader.readAsDataURL(input.target.files[0]);

                        if (
                          !input.target.files[0].type.endsWith("jpeg") &&
                          !input.target.files[0].type.endsWith("png")
                        ) {
                          alert("Must upload only png or jpeg");
                          return;
                        }
                        reader.onload = (e) => {
                          document
                            .getElementById(`product-img-temp`)
                            .setAttribute("src", e.target.result);
                          document.getElementById(
                            `product-img-temp`
                          ).style.minWidth = "100%";
                          document.getElementById(
                            `product-img-temp`
                          ).style.minHheight = "100%";

                          MainImage = reader.result;
                        };
                      }}
                    />
                  </div>
                  <div className="row">
                    {productImages.map((prod, i) => {
                      return (
                        <div
                          class="col-sm-4 mt-1"
                          style={{ maxHeight: "66px", maxWidth: "98px" }}
                        >
                          <div
                            src={upload}
                            style={{
                              height: "100%",
                              width: "100%",
                              cursor: "pointer",
                              border: "1px dotted grey",
                              background: "lightgrey",
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
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>

                          <input
                            type="file"
                            id={`add-product-card-image-${i}`}
                            style={{ display: "none" }}
                            onChange={(input) => {
                              var reader = new FileReader();
                              reader.readAsDataURL(input.target.files[0]);
                              if (
                                !input.target.files[0].type.endsWith("jpeg") &&
                                !input.target.files[0].type.endsWith("png")
                              ) {
                                alert("Must upload only png or jpeg");
                                return;
                              }
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

                    <div className="col-sm-4 mt-1">
                      <button
                        className="col btn btn-outline-dark h-100 w-100"
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
                        Add Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="col-md-6">
          <div>
            <h1>
              <input
                type="text"
                name="product-name-edit"
                id="product-name-edit"
                className="form-control"
                placeholder="Product Title"
              />
            </h1>
            <p>
              <i>(artist name)</i>
            </p>
            <p className="color-dark">
              <textarea
                className="form-control"
                maxLength={150}
                placeholder="Brief Product Description (in upto 150 words)"
                style={{ height: "100%" }}
                id="product-desc-edit"
              />
            </p>
          </div>
          +
          <div className="d-flex justify-content-end mr-3 ml-3">
            <select
              name="varientSelect"
              id="varient-select-product"
              className="form-select form-select-sm "
              disabled
            >
              <option value="v">varients</option>
            </select>
          </div>
          <div className="row">
            {" "}
            <div className="col">
              <div class="">
                <p className="btn" style={{ fontSize: "30px" }}>
                  <b>
                    {" "}
                    ₹<span>9999</span>
                  </b>{" "}
                </p>
                <br />
              </div>
              <div className="col">
                <div className="d-flex" style={{ marginTop: "-10px" }}>
                  <button
                    type="button"
                    className="btn btn-outline-success flex-shrink-0 mr-3"
                  >
                    Buy Now <i class="fa-solid fas fa-money-check"></i>
                  </button>

                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                  >
                    Add to cart <i class="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </div>
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
      long_description: document.getElementById("product-long-description-edit")
        .value,
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
      <div style={{ marginTop: "120px" }}>
        <center>
          <h1>
            <b>Product Information</b>
          </h1>
          <h6>(the fields will appear as they look on this screen)</h6>
        </center>
        <ProductCardEdit />

        <center>
          <h2 className="mt-5">
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
            style={{ background: "whitesmoke" }}
          ></textarea>
        </div>
        <br />
        {/* information table */}

        <center>
          <h2 className="mt-5">
            Product <b>Description</b>
          </h2>
        </center>

        <textarea
          className="form-control container"
          id="product-long-description-edit"
          maxLength={1000}
          placeholder="In depth Product Description (upto 1000 charectars)"
          rows="12"
          style={{ background: "whitesmoke" }}
        ></textarea>

        <center>
          <h2 className="mt-5">
            Information <b>Table</b>
          </h2>
        </center>
        <InformationTableEdit informationTable={InformationTable} />
        {/* about the artist */}
        <center>
          <h2 className="mt-5">
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
