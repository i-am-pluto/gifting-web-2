import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ConfirmOrder = () => {
  let [address, setAddress] = useState({
    fline: "first line",
    sline: "second line",
    city: "city",
    state: "state",
    country: "India",
    pincode: "pincode",
    tag: "Home",
  });

  let [order, setOrder] = useState({});

  let [phoneNumber, setPhoneNumber] = useState();
  let [email, setEmail] = useState();

  const { id } = useParams();

  const fetchCustomer = async () => {
    const response = await fetch(`http://localhost:5000/api/customer/`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    if (!data.success) {
      return;
    }
    const obj = data.obj;
    console.log(obj);
    setAddress(obj.address);
    setPhoneNumber(obj.phonenumber);
    setEmail(obj.email);
  };

  const fetchOrder = async () => {
    const response = await fetch(
      `http://localhost:5000/api/order/${id}/group`,
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
  };

  const [product, setProduct] = useState({
    product_name: "mor ka pankh",
    artist_name: "shree krishna",
    mainimage:
      "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
  });

  useEffect(() => {
    // fetchOrder();
    fetchCustomer();
  }, []);

  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);
    console.log(params);
    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const temp = order;

    temp.address = address;
    temp.contact_details = { phoneNumber, email };

    const response = await fetch(
      `http://localhost:5000/api/order/${id}/confirm-order-group`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(temp),
      }
    );
    console.log("here");
    const data = await response.json();
    console.log(data);

    var information = {
      action: "https://securegw-stage.paytm.in/order/process",
      params: data,
    };
    post(information);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/order/${id}/delete-order-group`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    // history.push()
  };

  return (
    <div style={{ marginTop: "110px" }} className="container">
      <br />
      <center>
        <h1 style={{ marginLeft: "-10px", marginBottom: "20px" }}>
          Confirm <b>Order</b>
        </h1>
      </center>
      {/* <hr /> */}

      <br />
      <div
        className="container"
        style={{
          backgroundColor: "lightgray",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <center>
          <h3>
            Contact <b>Details</b>
          </h3>
        </center>
        <br />
        <div className="row container">
          <div className="col personal-info">
            <div className="form-group">
              <label className="control-label">Email:</label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">Phone Number:</label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    const n = e.target.value;
                    if (isNaN(n) || n.length < 10 || n.length > 10) {
                      e.target.style.borderColor = "red";
                      return;
                    }
                    e.target.style.borderColor = "green";
                    setPhoneNumber(Number(n));
                  }}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col personal-info">
            <center>
              <h3>
                Address <b>Details</b>
              </h3>
            </center>
            <br />
            <div className="container">
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
                  value={address.country}
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
                    value={address.tag}
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
      <br />
      <hr />
      <div className="container">
        <center>
          <div className="row justify-content-center">
            <div className="col">
              <button className="row col btn btn-danger" onClick={handleCancel}>
                cancel
              </button>
            </div>
            <div className="col">
              <button
                className="row col btn btn-warning"
                onClick={handleSubmit}
              >
                confirm
              </button>
            </div>
          </div>
        </center>
      </div>
      <br />
    </div>
  );
};

export default ConfirmOrder;
