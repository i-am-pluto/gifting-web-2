import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ArtistProfile.css";
import EditArtistProfile from "./EditArtistProfile";
import EditGeneral from "./EditGeneral";
import { EditProfile } from "./EditProfile";
import ArtistOrders from "./orders/ArtistOrders";
import Orders from "./orders/ArtistOrders";
function ArtistProfile({ user }) {
  let [active, setActive] = useState(["active", "", "", "", ""]);
  let [active_show, setActive_show] = useState(["active show", "", "", "", ""]);
  const [artist, setArtist] = useState(false);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch("http://localhost:5000/api/artist/" + id, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setArtist(data);
      });
  }, []);

  let profile_user = {
    id: user._id,
    ...user,
    ...artist,
  };

  const loading = () => {
    if (user.name && artist) {
      const s = profile_user.socials;
      const socials = [];
      for (const el in s) {
        socials.push([el, s[el]]);
      }

      return (
        <div style={{ marginTop: "60px" }}>
          {/* profile picture on top and cover and artist name and bio  */}
          <div className="cover-image">
            <img
              src={profile_user.cover_url}
              alt=""
              srcset=""
              className="cover-image-pic"
            />
          </div>
          <div className="profile-pic">
            <img
              src={profile_user.pfp_url}
              alt=""
              srcset=""
              className="profile-pic-image"
            />
          </div>

          <div className="container">
            <center>
              <h2>
                <b>
                  {profile_user.name.f_name + " " + profile_user.name.l_name}
                </b>
              </h2>
              <h6>{profile_user.bio}</h6>
            </center>
            <hr />
            <div>
              <div className="row text-center m-t-20 d-flex justify-content-center">
                <div className="col-lg-4 col-md-4">
                  <h3 className="m-b-0 font-light">
                    {profile_user.follower_count}
                  </h3>
                  <small>Followers</small>
                </div>
              </div>
              <div className="socials d-flex justify-content-evenly">
                {socials.map((s, i) => {
                  console.log(s);
                  return (
                    <a href={s[1]}>
                      <i class={`btn fab fa-${s[0]}`}></i>
                    </a>
                  );
                })}
              </div>
            </div>
            <hr />
          </div>

          <div className="container py-5">
            <div className="p-5 bg-white rounded shadow mb-5">
              {/* <!-- Rounded tabs --> */}
              {/* // each in diff. bootstrap tabs  */}

              <ul className="nav nav-tabs nav-pills  text-center bg-light border-0 rounded-nav d-flex justify-content-around">
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 text-uppercase font-weight-bold ${active[0]}`}
                    onClick={() => {
                      setActive(["active", "", "", "", ""]);
                      setActive_show(["active show", "", "", "", ""]);
                    }}
                  >
                    User
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 text-uppercase font-weight-bold ${active[1]}`}
                    onClick={() => {
                      setActive(["", "active", "", "", ""]);
                      setActive_show(["", "active show", "", "", ""]);
                    }}
                  >
                    Artist Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 text-uppercase font-weight-bold ${active[2]}`}
                    onClick={() => {
                      setActive(["", "", "active", "", ""]);
                      setActive_show(["", "", "active show", "", ""]);
                    }}
                  >
                    General Information
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className={`nav-link border-0 text-uppercase font-weight-bold ${active[3]}`}
                    onClick={() => {
                      setActive(["", "", "", "active", ""]);
                      setActive_show(["", "", "", "active show", ""]);
                    }}
                  >
                    Orders
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className={`nav-link border-0 text-uppercase font-weight-bold ${active[4]}`}
                    onClick={() => {
                      setActive(["", "", "", "", "active"]);
                      setActive_show(["", "", "", "", "active show"]);
                    }}
                  >
                    Add A Product
                  </button>
                </li>
              </ul>
              <div id="myTabContent" className="tab-content">
                <div className={`tab-pane fade px-4 py-5 ${active_show[0]}`}>
                  <EditProfile profile_user={profile_user} />
                  {/* edit profile image */}
                  {/* edit name */}
                </div>
                <div className={`tab-pane fade px-4 py-5 ${active_show[1]}`}>
                  <EditArtistProfile profile_user={profile_user} />
                  {/* a list of all orders. containst order id and only the name of the product. add a link to '/order/:orderID' to the order id which redirects to the order page */}
                </div>
                <div className={`tab-pane fade px-4 py-5 ${active_show[2]}`}>
                  {/* edit payment details */}
                  <EditGeneral profile_user={profile_user} />
                  {/* edit address */}
                </div>
                <div className={`tab-pane fade px-4 py-5 ${active_show[3]}`}>
                  <h1 class="text-primary">Orders</h1>
                  <hr />
                  <ArtistOrders />
                  {/* a list of all orders. containst order id and only the name of the product. add a link to '/order/:orderID' to the order id which redirects to the order page */}
                </div>
                <div className={`tab-pane fade px-4 py-5 ${active_show[4]}`}>
                  <center>
                    <a href={`/user/${id}/addaproduct`}>
                      <button className="btn btn-outline-warning">
                        Start the Product Page Builder
                      </button>
                    </a>
                  </center>
                </div>
              </div>
              {/* <!-- End rounded tabs --> */}
            </div>
          </div>
        </div>
      );
    } else
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
          alt=""
          srcset=""
        />
      );
  };

  return <div>{loading()}</div>;
}

export default ArtistProfile;
