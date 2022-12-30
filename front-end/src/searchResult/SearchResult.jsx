import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const SearchResult = () => {
  const { pgeno } = useParams();
  const [result, setResult] = useState([]);
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
      setResult(searchData);
    };
    setSearchResults();
  }, []);

  return <div className="mt-4">
    <h1></h1>
  </div>;
};

export default SearchResult;
