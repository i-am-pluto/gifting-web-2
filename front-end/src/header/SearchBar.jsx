import React from "react";
import ReactDOM from "react-dom";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchRecommendation from "./SearchRecommendation";
import { useEffect } from "react";

function SearchBar() {
  let currentFocus;
  const processInputList = (e, searchData) => {
    closeAllLists();
    currentFocus = -1;
    const a = document.createElement("DIV");
    console.log(e.target);
    a.setAttribute("id", e.target.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    e.target.parentNode.appendChild(a);

    const b = [];

    for (const recommendation of searchData) {
      b.push(
        <a href={recommendation.p_url} style={{ color: "inherit" }}>
          <div className="row search-recommendation">
            <section className="col-sm-4 row justify-content-center">
              <img
                src={recommendation.thumbnail}
                alt=""
                srcset=""
                className="search-recommendation-thumbnail"
              />
            </section>
            <section className="col-lg-6">
              <section className="row font-weight-bold mt-3">
                {recommendation.p_name}
              </section>

              <section className="row font-weight-light font-italic artist-search-recommendation">
                {recommendation.artist_name}
              </section>
              <section className="row font-weight-light font-italic categories-search-recommendation">
                {recommendation.categories}
              </section>
            </section>
          </div>
        </a>
      );
    }
    ReactDOM.render(b, a);
  };
  useEffect(() => {
    document.body.onclick = (e) => {
      closeAllLists();
    };
  }, []);

  const closeAllLists = (elmnt) => {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i]) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  };

  return (
    <div className=" flex-grow-1 ">
      <div className="row bd-highlight" id="search-box">
        <div className="col-lg-2">
          <input
            className="form-control"
            id="search-box-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onClick={(e) => {
              document.getElementById(
                "search-result-box-overlay"
              ).style.display = "block";
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("search-box-button").click();
              }
            }}
            onChange={async (e) => {
              const words = e.target.value;
              if (!words || !words.length) {
                closeAllLists();
                return;
              }
              const response = await fetch(
                "http://localhost:5000/api/search/lookup?" +
                  new URLSearchParams({
                    term: words,
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

              processInputList(e, searchData);
            }}
          />
        </div>
        <div className="col ">
          <button
            className="header__searchIcon"
            id="search-box-button"
            onClick={async (e) => {
              e.preventDefault();
              window.location.href =
                "/search/0?" +
                new URLSearchParams({
                  query: document.getElementById("search-box-input").value,
                });
            }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              style={{ color: "white", height: "100%" }}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div
        className=" search-result-box"
        id="search-result-box-overlay"
        onClick={(e) => {
          e.currentTarget.style.display = "none";
        }}
      ></div>
    </div>
  );
}

export default SearchBar;
