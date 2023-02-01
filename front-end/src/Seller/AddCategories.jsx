import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./AddCategory.css";

const AddCategories = () => {
  const closeAllLists = (elmnt) => {
    var x = document.getElementsByClassName("category-autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i]) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  };

  const processInputList = (e, searchData, words) => {
    closeAllLists();
    const a = document.createElement("DIV");
    console.log(e.target);
    a.setAttribute("id", e.target.id + "category-autocomplete-list");
    a.setAttribute("class", "category-autocomplete-items");

    e.target.parentNode.appendChild(a);

    const b = [];

    for (const recommendation of searchData) {
      b.push(
        <div
          className="container row btn-outline-dark btn"
          onClick={(e) => {
            setSelectedCategories([
              ...selectedCategories,
              { cat_name: recommendation.cat_name, cat_id: recommendation._id },
            ]);
            closeAllLists();
            e.target.value = "";
          }}
        >
          <section className="col-5">
            <section className="row">{recommendation.cat_name}</section>
          </section>
        </div>
      );
    }

    b.push(
      <button
        className="btn btn-outline-danger"
        style={{ width: "100%", borderRadius: "0px" }}
        onClick={(e) => {
          setSelectedCategories([...selectedCategories, { cat_name: words }]);
          closeAllLists();
          e.currentTarget.innerText = "";
        }}
      >
        {" "}
        Add New
      </button>
    );

    ReactDOM.render(b, a);
  };

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/product/${id}/addcategories`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedCategories),
      }
    );
    const data = await response.json();
    if (data.success) {
      window.location.href = "/product/" + id;
    } else {
      alert("Something Went Wrong");
    }
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const colors = [
    "#F0F8FF",
    "#00FFFF",
    "#7FFFD4",
    "#F0FFFF",
    "#F5F5DC",
    "#FFEBCD",
    "#DEB887",
    "#7FFF00",
    "#008080",
    "#FF7F50",
    "#FFF8DC",
    "#00FFFF",
  ];

  let disabled = false;
  if (selectedCategories.length === 10) {
    disabled = true;
  }

  const selectColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="margin-set-top">
      <center>
        <h1 style={{ marginTop: "100px" }}>
          Add <b> Categories</b>
        </h1>
      </center>

      <hr />

      <div className="container">
        *Add categories and keywords. To make it easy for the user to search
        your product, select the pre-added categories to help group the product
        with others of similar categories or add new categories.
        <br /> click on the buttons to remove.
      </div>
      <hr />
      <center>
        <div className="container row" style={{ marginTop: "90px" }}>
          {selectedCategories.map((el, i) => {
            console.log(el);
            return (
              <div
                className="btn btn-light col d-flex m-3 p-3 align-items-center"
                style={{
                  backgroundColor: selectColor(),
                  //   height: "max-content",
                  font: "caption",
                  maxWidth: "120px",
                  fontSize: "13px",
                  fontWeight: "bolder",
                  border: "2px solid black",
                }}
                onClick={(e) => {
                  const n = [...selectedCategories];
                  n.splice(i, 1);
                  setSelectedCategories(n);
                }}
              >
                <div className="col">{el.cat_name}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 row container" style={{ marginBottom: "90px" }}>
          <input
            type="text"
            name=""
            id=""
            className="form-control"
            disabled={disabled}
            onChange={async (e) => {
              const words = e.target.value;
              if (!words || !words.length) {
                closeAllLists();
                return;
              }
              const response = await fetch(
                "http://localhost:5000/api/category?" +
                  new URLSearchParams({
                    category: words,
                  }),
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
              const searchData = await response.json();
              console.log(searchData);

              processInputList(e, searchData, words);
            }}
          />
          <div className="legend">{10 - selectedCategories.length} left</div>
        </div>
      </center>
      <button
        className="btn btn-warning col mt-5"
        style={{ border: "1px solid brown" }}
        onClick={handleSubmit}
      >
        submit
      </button>
    </div>
  );
};

export default AddCategories;
