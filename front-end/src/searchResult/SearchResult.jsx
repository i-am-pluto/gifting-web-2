import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./SearchResult.css";

const SearchResult = () => {
  const { pgeno } = useParams();
  const [productList, setProductList] = useState([]);
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("query");
  console.log(query);
  useEffect(() => {
    const setSearchResults = async () => {
      const response = await fetch(
        `http://localhost:5000/api/search/${pgeno}?` +
          new URLSearchParams({
            query: query,
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

      if (searchData.success === false) {
        alert(searchData.error);
        return;
      }
      setProductList(searchData);
    };
    setSearchResults();
  }, []);
  const getProductsByRelevancy = async () => {
    const response = await fetch(
      `http://localhost:5000/api/search/${pgeno}?` +
        new URLSearchParams({
          query: query,
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

    if (searchData.success === false) {
      alert(searchData.error);
      return;
    }
    setProductList(searchData);
  };
  const getProductListPLtoH = async () => {
    const response = await fetch(
      `http://localhost:5000/api/search/${pgeno}/plth?` +
        new URLSearchParams({
          query: query,
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

    if (searchData.success === false) {
      alert(searchData.error);
      return;
    }
    setProductList(searchData);
  };
  const getProductListPHtoL = async () => {
    const response = await fetch(
      `http://localhost:5000/api/search/${pgeno}/phtl?` +
        new URLSearchParams({
          query: query,
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

    if (searchData.success === false) {
      alert(searchData.error);
      return;
    }
    setProductList(searchData);
  };

  // const productList = [];
  // for (var i = 0; i < 35; i++) {
  //   productList.push({
  //     p_name: "WorldClass Pencil Designer Art",
  //     artist_name: "Yuvraj Nain",
  //     main_image_url:
  //       "https://i.etsystatic.com/26936528/r/il/ae58c2/3724808491/il_794xN.3724808491_pkz3.jpg",
  //     price: 2000,
  //     description:
  //       "lorem ipsum lorem sasc sdmer min asfe snfea scmdknw nern ascsde",
  //   });
  // }

  let [[before, setBefore], [after, setAfter]] = [
    useState(Number(pgeno) - 1),
    useState(Number(pgeno) + 1),
  ];

  useEffect(() => {
    const setBeforeAfter = async (pg) => {
      if (pg < 0) {
        setBefore(pgeno);
      } else {
        const response = await fetch(
          `http://localhost:5000/api/search/${pg - 1}?` +
            new URLSearchParams({
              query: query,
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
        if (searchData.length === 0) setBefore(pgeno);
        if (searchData.success === false) setBefore(pgeno);
      }

      const response2 = await fetch(
        `http://localhost:5000/api/search/${pg + 1}?` +
          new URLSearchParams({
            query: query,
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
      const searchData2 = await response2.json();

      if (searchData2.length === 0) setAfter(pgeno);
    };

    setBeforeAfter(Number(pgeno));
  }, []);

  console.log("before ", before);

  const generatePageNoDiv = () => {
    return (
      <div className="d-flex align-items-center">
        <a
          href={
            `/search/${before}?` +
            new URLSearchParams({
              query: query,
            })
          }
        >
          <button className=" btn btn-light mr-2">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </a>
        <button className="btn" disabled>
          <div style={{ border: "1px solid black" }} className="p-1">
            {pgeno}
          </div>
        </button>
        <a
          href={
            `/search/${after}?` +
            new URLSearchParams({
              query: query,
            })
          }
        >
          <button className=" btn btn-light ml-2">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </a>
      </div>
    );
  };

  return (
    <div className="margin-set-top" style={{ marginTop: "90px" }}>
      <center>
        <h1>
          Search <b> Results</b>
        </h1>
      </center>

      <div className="search-result-filter-box d-flex align-items-center container">
        <button
          className="btn btn-info show-filter-btn mr-auto p-2"
          style={{ minWidth: "max-content", fontSize: "13px" }}
        >
          Show Filters
        </button>
        <select
          class="form-select p-2 sort-by-search-result mr-4"
          onChange={(e) => {
            if (e.target.value === "1") {
              getProductsByRelevancy();
            }
            if (e.target.value === "2") {
              getProductListPLtoH();
            }
            if (e.target.value === "1") {
              getProductListPHtoL();
            }
          }}
        >
          <option disabled>SortBy ~</option>
          <option value="1" selected>
            Relevancy
          </option>
          <option value="2">Price low to high</option>
          <option value="3">Price high to low</option>
        </select>
        <div>{generatePageNoDiv()}</div>
      </div>
      <div style={{ marginBottom: "70px" }}></div>
      <div className="search-result-product-list d-flex flex-wrap justify-content-center container-xxl">
        {productList.map((product, i) => {
          return (
            <a className="btn" href={`${product.p_url}`}>
              <div class="product-card-search">
                <div class="product-tumb-search">
                  <img src={product.thumbnail} alt="" />
                </div>
                <div class="product-details-search">
                  <h4>{product.p_name}</h4>
                  <p>{product.description}</p>
                  <div class="product-bottom-details-search">
                    <div class="product-price-search">₹ {product.price}</div>
                    <div class="product-links-search">
                      <a href="" className="btn btn-outline-danger">
                        <i className="fa fa-heart"></i>
                      </a>
                      <a href="" className="btn btn-outline-warning">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
