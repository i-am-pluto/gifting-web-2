import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const Varients = () => {
  let [vform, setVForm] = useState([{}]);
  const { id } = useParams();
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const Body = [];
    vform.forEach(({ varient_name, varient_price, varient_stocks }, i) => {
      if (varient_name && varient_price && varient_stocks) {
        Body.push({ varient_name, varient_price, varient_stocks });
      }
    });

    if (!Body.length) {
      alert("Must Add atleast 1 varient");
      return;
    }
    const body = {
      varients: Body,
    };
    console.log(body);
    const response = await fetch(
      `http://localhost:5000/api/product/${id}/addvarients`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    if (data.success) {
      history.push(`/product/${id}`);
    } else alert("Something Went Wrong.");
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <div>
        <h1 style={{ textAlign: "center" }}>
          Add <b>Varients</b>
        </h1>

        <hr />
        <div className="container">
          *Add the varients with price and stocks . On leaving any field blank
          the field will not be saved. The first added varient is by default set
          as the primary varient and will be selected by default when any
          customer views the product page.
        </div>
        <hr />
        {vform.map((e, i) => {
          return (
            <div>
              <center>
                <div className="container">
                  <div class="row">
                    <div
                      className="col-sm-1"
                      style={{ marginTop: "30px", fontSize: "17px" }}
                    >
                      <i>{i + 1}.</i>
                    </div>
                    <div class="col-md">
                      <div class="mb-3">
                        <small>Varient Name</small>
                        <div class="input-group">
                          <input
                            class="form-control InputBorder"
                            type="text"
                            placeholder="Varient title"
                            onChange={(e) => {
                              vform[i].varient_name = e.target.value;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="mb-3">
                        <small>Price</small>
                        <div class="input-group">
                          <input
                            class="form-control InputBorder"
                            type="number"
                            min={0}
                            placeholder="Price"
                            onChange={(e) => {
                              vform[i].varient_price = e.target.value;
                              console.log(vform);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="mb-3">
                        <small>Stocks</small>
                        <div class="input-group">
                          <input
                            class="form-control InputBorder"
                            type="Number"
                            min={0}
                            placeholder="Stocks"
                            onChange={(e) => {
                              vform[i].varient_stocks = e.target.value;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-1" style={{ marginTop: "23px" }}>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          setVForm([...vform, {}]);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </center>
            </div>
          );
        })}
      </div>
      <button
        className="btn btn-warning col-sm "
        width="100%"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};
