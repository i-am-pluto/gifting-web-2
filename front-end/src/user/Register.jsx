import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// require("dot-env").config();

function Register() {
  let name = {};
  let email = new String();
  let password = new String();
  let phonenumber = 0;
  let address = {};
  let artist = false;
  let customer = false;
  let [alert, setAlert] = useState("");
  let navigate = useHistory();
  const signupButton = async (e) => {
    // console.log("hi");
    e.preventDefault();

    const obj = {
      name: name,
      email: email,
      phone: phonenumber,
      address: address,
      username: email,
      password: password,
      artist,
      customer,
    };
    console.log(JSON.stringify(obj));
    const respone = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obj),
    });

    respone.json().then((data) => {
      if (data.success && artist) {
        window.location.replace(data.url);
      } else if (data.success) {
        navigate.push("/login");
      } else {
        setAlert("Pls Fill The Form With Valid Information");
      }
      console.log(data);
    });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const nextButton = (e) => {
    e.preventDefault();
    console.log("hi");

    if (!name.f_name || !email || !password) {
      setAlert("Please Fill the Required Fields");
      console.log(alert);
      return;
    }
    if (!validateEmail(email)) {
      setAlert("Invalid Email Address");
      console.log("2");
      return;
    }
    if (!validatePassword(password)) {
      setAlert("Password Must be atleast 8 charectars long");
      console.log("3");
      return;
    }
    console.log(email);
    setAlert("");
    console.log("hi");
    setGeneralInfo("");
    setExtraInfo(
      <section className="login-dark">
        <form>
          <div className="illustration">
            <h3>Additional Info</h3>
          </div>
          <div>
            <label htmlFor="f_name">Phone No. : </label>
          </div>
          <div className="row">
            <input
              className="form-control ml-2 col"
              type="tel"
              name="phonenumber"
              placeholder="1234567809"
              onChange={(e) => {
                const n = e.target.value;
                if (isNaN(n) || n.length < 10 || n.length > 10) {
                  e.target.style.borderColor = "red";
                  return;
                }
                e.target.style.borderColor = "green";
                phonenumber = Number(n);
              }}
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="f_name">Address :</label>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                name="fline"
                id="fline"
                placeholder="First Line"
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
                placeholder="Second Line"
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
                placeholder="City"
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
                placeholder="State"
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
                placeholder="zip"
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
          <div>
            <label htmlFor="ss">Account Type:</label>
            <div className="row">
              <div className="col">
                <input
                  className="form-check"
                  type="checkbox"
                  name="artist"
                  id="artist"
                  onChange={(e) => {
                    if (e.target.checked) {
                      artist = true;
                    } else artist = false;
                  }}
                />
                <label class="form-check-label" for="artist">
                  Artist
                </label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  className="form-check"
                  name="customer"
                  id="customer"
                  onChange={(e) => {
                    if (e.target.checked) {
                      customer = true;
                    } else customer = false;
                  }}
                />
                <label class="form-check-label" for="customer">
                  Customer
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <button
              className="btn btn-primary d-block w-100"
              onClick={signupButton}
            >
              Sign up
            </button>
          </div>
        </form>
      </section>
    );
  };

  const [generalInfo, setGeneralInfo] = useState(
    <section className="login-dark">
      <form onSubmit="return false;">
        <div className="illustration">
          <h3>Sign Up</h3>
        </div>
        <div>
          <label htmlFor="f_name">Name : </label>
        </div>
        <div className="row">
          <input
            className="ml-2 form-control col"
            type="f_name"
            name="f_name"
            placeholder="first name"
            onChange={(e) => (name.f_name = e.target.value)}
            required
          />

          <input
            className="form-control ml-2 col"
            type="l_name"
            name="l_name"
            placeholder="last name"
            onChange={(e) => (name.l_name = e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="f_name">Email :</label>
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={(e) => {
              const n = e.target.value;
              if (!validateEmail(n)) {
                e.target.style.borderColor = "red";
                email = n;
                return;
              }
              e.target.style.borderColor = "green";
              email = n;
            }}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="f_name">Password :</label>
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              const n = e.target.value;
              password = n;
              if (n.length < 8) {
                e.target.style.borderColor = "red";
                return;
              }
              e.target.style.borderColor = "green";
              password = e.target.value;
            }}
            required
          />
        </div>

        <div className="mb-3">
          <button
            className="btn btn-primary d-block w-100"
            onClick={nextButton}
          >
            Next
          </button>
        </div>
      </form>
    </section>
  );
  const [extraInfo, setExtraInfo] = useState();

  return (
    <div>
      <h1 style={{ color: "red", marginTop: "65px", textAlign: "center" }}>
        {alert}
      </h1>
      {generalInfo}
      {extraInfo}
    </div>
  );
}

export default Register;
