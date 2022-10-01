import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Role() {
  const [artistButton, setArtistButton] = useState("disabled");
  const [customerButton, setCustomerButton] = useState("");
  const [user, setUser] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/user/", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        const body = await response.json();
        if (!body._id) {
          alert(body.message);
        }
        setUser(body);
        console.log(body);
        if (body.artist === true) {
          const artistButton = (
            <div className="">
              <a href={`${id}/artist`}>
                <button className={"btn btn-danger"}>Artist</button>
              </a>
            </div>
          );
          setArtistButton(artistButton);
        }
        if (body.customer === true) {
          const customerButton = (
            <div className="">
              <a href={`${id}/customer`}>
                <button className={"btn btn-warning"}>Customer</button>
              </a>
            </div>
          );
          setCustomerButton(customerButton);
        }
        if (body.artist === false) {
          const registerAsArtist = (
            <div>
              <button
                className="btn btn-success"
                onClick={async (e) => {
                  const response = await fetch(
                    "http://localhost:5000/api/user/" + id + "/markuserartist",
                    {
                      method: "GET",
                      mode: "cors",
                      credentials: "include",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const body = await response.json();
                  if (body.success) {
                    setArtistButton(
                      <div className="">
                        <a href={`${id}/artist`}>
                          <button className={"btn btn-danger"}>Artist</button>
                        </a>
                      </div>
                    );
                  } else {
                    alert(body.message);
                  }
                }}
              >
                Register As An Artist
              </button>
            </div>
          );
          setArtistButton(registerAsArtist);
        }
        if (body.customer === false) {
          const registerAsACustomer = (
            <div>
              <button
                className="btn btn-success"
                onClick={async (e) => {
                  const response = await fetch(
                    "http://localhost:5000/api/user/" +
                      id +
                      "/markusercustomer",
                    {
                      method: "GET",
                      mode: "cors",
                      credentials: "include",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const body = await response.json();
                  if (body.success) {
                    setCustomerButton(
                      <div className="">
                        <a href={`${id}/customer`}>
                          <button className={"btn btn-warning"}>
                            Customer
                          </button>
                        </a>
                      </div>
                    );
                  } else {
                    alert(body.message);
                  }
                }}
              >
                Register As A Customer
              </button>
            </div>
          );
          setCustomerButton(registerAsACustomer);
        }
      }

      return response;
    };
    fetchData();
  }, []);

  return (
    <div style={{ marginTop: "60px" }}>
      <div className="mt-4 container" style={{ marginTop: "60px" }}>
        <div
          className="d-flex justify-content-around align-items-center"
          style={{ height: "600px", marginRight: "100px" }}
        >
          {artistButton}
          {customerButton}
        </div>
      </div>
    </div>
  );
}

export default Role;
