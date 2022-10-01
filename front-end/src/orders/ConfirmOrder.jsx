import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ConfirmOrder = () => {
  const [order, setOrder] = useState({
    product_name: "mor ka pankh",
    artist_name: "shree krishna",
    customization: "Most colourful pankh chahiye",
    order_amount: 2000,
    mainimage:
      "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
  });

  let [address, setAddress] = useState({
    fline: "first line",
    sline: "second line",
    city: "city",
    state: "state",
    country: "India",
    pincode: "pincode",
    tag: "Home",
  });

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
    setPhoneNumber(obj.phoneNumber);
    setEmail(obj.email);
  };

  const fetchOrder = async () => {
    const response = await fetch(`http://localhost:5000/api/order/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    setOrder(data);
  };
  const [product, setProduct] = useState({
    product_name: "mor ka pankh",
    artist_name: "shree krishna",
    mainimage:
      "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
  });
  const fetchProduct = async () => {
    const response = await fetch(
      `http://localhost:5000/api/product/${order.order_items}`,
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
    setProduct({
      product_name: data.product_name,
      artist_name: data.artist.artist_name,
      mainimage: data.main_image_url,
    });
  };

  useEffect(() => {
    if (order.order_items) fetchProduct();
  }, [order]);

  useEffect(() => {
    fetchOrder();
    fetchCustomer();
  }, []);

  const handleSubmit = async (e) => {};

  return (
    <div style={{ marginTop: "90px" }} className="container">
      <br />
      <h1 style={{ marginLeft: "20px" }}>
        Confirm <b>Order</b>
      </h1>
      <hr />

      <div className="row">
        <div className="col-sm-3">
          <img
            src={product.mainimage}
            alt=""
            srcset=""
            style={{
              objectFit: "contain",
              height: "100%",
              width: "100%",
              boxShadow: "0px 6px 6px 0px",
            }}
          />
        </div>
        <div className="col-sm-7 ml-4">
          <p>
            <b>Product :</b>&nbsp;&nbsp; {product.product_name}
          </p>
          <p>
            <b>Artist :</b>&nbsp;&nbsp;
            {product.artist_name}
          </p>
          <p>
            <b>Attached Message :</b>&nbsp;&nbsp;
            {order.customization}
          </p>
          <p>
            <b>Price :</b>
            &nbsp;&nbsp;
            {order.order_amount}
          </p>

          <div>
            <button className="btn btn-warning">Confirm</button>
            <button className="ml-3 btn btn-danger">Cancel</button>
          </div>
        </div>
      </div>

      <hr />

      <br />
      <h3>
        Contact <b>Details</b>
      </h3>
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
          <h3>
            Address <b>Details</b>
          </h3>
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
      <br />
      <hr />
      <br />
    </div>
  );
};

export default ConfirmOrder;
