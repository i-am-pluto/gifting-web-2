import React from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
function Login() {
  let navigate = useHistory();
  const Obj = {};

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("here");
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Obj),
    });
    const data = await response.json();
    if (data.success) {
      navigate.push("/home");
    } else {
      alert("Invalid Email or Password");
    }
    console.log(data);
  };
  return (
    <div>
      <div className="blur"></div>
      <section className="login-dark">
        <form
          onSubmit={() => {
            return false;
          }}
        >
          <div className="illustration">
            <h3>World On Pencil</h3>
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                Obj.username = e.target.value;
                if (!validateEmail(e.target.value)) {
                  e.target.style.borderColor = "red";
                } else e.target.style.borderColor = "green";
              }}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                Obj.password = e.target.value;
              }}
            />
          </div>
          <div className="mb-3">
            <button
              className="btn btn-primary d-block w-100"
              onClick={handleClick}
            >
              Log In
            </button>
          </div>
          <a className="forgot" href="/register">
            Register
          </a>
          <a className="forgot" href="/recovery" style={{ marginTop: "7px" }}>
            Forgot your email or password?
          </a>
        </form>
      </section>
    </div>
  );
}

export default Login;
