import React, { useState } from "react";

const EditGeneral = ({ profile_user }) => {
  let address = profile_user.address;
  let artist = profile_user.artist;
  let customer = profile_user.customer;
  const handleSubmit = async (e) => {
    const body = address;
    const response = await fetch(
      "http://localhost:5000/api/user/" + profile_user.id + "/editaddress",
      {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    if (!data.success) {
      alert("Info Not Updated");
    }
    window.location.reload();
  };

  return (
    <div>
      <div class="container bootstrap snippets bootdey">
        <h1 class="text-primary">General Information</h1>
        <p className="alert">
          *The Information below can be updated at the time of order
        </p>
        <hr />
        <div class="row">
          <div class="col">
            <h3>Payment Information</h3>
            <form class="form-horizontal" onSubmit={handleSubmit}>
              <div class="form-group">
                *Gifting Website handles payment using a third party login to
                your stripe account to view and manage your account details.
              </div>
              <a
                href="https://dashboard.stripe.com/"
                className="btn btn-outline-warning"
              >
                <img
                  src="https://woocommerce.com/wp-content/uploads/2011/12/stripe-logo-blue.png"
                  alt=""
                  srcset=""
                  style={{ maxHeight: "20%", maxWidth: "20%" }}
                />
              </a>
            </form>
          </div>

          <div class="col personal-info">
            <h3>Address</h3>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  name="fline"
                  id="fline"
                  placeholder={address.fline}
                  className="form-control"
                  onChange={(e) => {
                    address.fline = e.target.value;
                  }}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="sline"
                  id="sline"
                  placeholder={address.sline}
                  className="form-control"
                  onChange={(e) => {
                    address.sline = e.target.value;
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder={address.city}
                  className="form-control"
                  onChange={(e) => {
                    address.city = e.target.value;
                  }}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="state"
                  id="state"
                  placeholder={address.state}
                  className="form-control"
                  onChange={(e) => {
                    address.state = e.target.value;
                  }}
                />
              </div>
            </div>
            <div className="mb-2">
              <select
                className="form-select bg-dark text-white"
                onChange={(e) => {
                  address.country = e.target.value;
                }}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder={address.pincode}
                  onChange={(e) => {
                    const n = e.target.value;
                    if (isNaN(n) || n.length != 6) {
                      e.target.style.borderColor = "red";
                      return;
                    }
                    e.target.style.borderColor = "green";
                    address.pincode = Number(n);
                  }}
                ></input>
              </div>

              <div className=" col">
                <select
                  name="tag"
                  id=""
                  className="form-select bg-dark text-white"
                  onChange={(e) => {
                    address.tag = e.target.value;
                  }}
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <br />

            <button className="btn btn-primary" onClick={handleSubmit}>
              <i className="fas fa-save"></i>
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default EditGeneral;
