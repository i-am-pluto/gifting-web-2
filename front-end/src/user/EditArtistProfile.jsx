import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import React, { useState } from "react";

const EditArtistProfile = ({ profile_user }) => {
  // return <div></div>;

  if (!profile_user.socials) {
    profile_user.socials = {};
  }

  const [bio, setBio] = useState(profile_user.bio);
  const [fb, setFb] = useState(
    profile_user.socials.facebook ? profile_user.socials.facebook : ""
  );
  const [tw, setTw] = useState(
    profile_user.socials.twitter ? profile_user.socials.twitter : ""
  );
  const [yt, setYt] = useState(
    profile_user.socials.youtube ? profile_user.socials.youtube : ""
  );
  const [pin, setPin] = useState(
    profile_user.socials.pinterest ? profile_user.socials.pinterest : ""
  );
  const [insta, setInsta] = useState(
    profile_user.socials.instagram ? profile_user.socials.instagram : ""
  );
  const [cover, setCover] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tmp = {
      facebook: fb,
      twitter: tw,
      instagram: insta,
      pinterest: pin,
      youtube: yt,
    };
    const socials = {};
    for (const el in tmp) {
      if (tmp[el]) {
        socials[el] = tmp[el];
      }
    }

    const user = {
      socials: socials,
      bio: bio,
    };
    const response = await fetch(
      `http://localhost:5000/api/artist/${profile_user.id}/edit`,
      {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    if (!data.success) {
      alert(data.message);
    }

    if (cover) {
      const responsePfp = await fetch(
        `http://localhost:5000/api/artist/${profile_user.id}/setcoverpic`,
        {
          method: "PUT",
          mode: "cors",
          credentials: "include",
          body: JSON.stringify({ data: cover }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const d2 = await responsePfp.json();
      if (!d2.success) {
        alert(d2.message);
      }
      // window.location.reload();
    }
  };

  return (
    <div>
      <div class="container bootstrap snippets bootdey">
        <h1 class="text-primary">Edit Artist Profile</h1>
        <hr />
        <div class="row">
          <div class="col-md-3">
            <div class="text-center">
              <img
                class="avatar img-circle img-thumbnail"
                alt="avatar"
                id="cover-pic"
              />
              <h6>Cover Picture</h6>
              <input
                type="file"
                class="form-control"
                onChange={(input) => {
                  var reader = new FileReader();
                  reader.readAsDataURL(input.target.files[0]);
                  reader.onload = (e) => {
                    document
                      .getElementById("cover-pic")
                      .setAttribute("src", e.target.result);
                    console.log(reader.result);
                    setCover(reader.result);
                  };
                }}
              />
            </div>
          </div>

          <div class="col-md-9 personal-info">
            <form class="form-horizontal" onSubmit={handleSubmit}>
              <div class="form-group">
                <label class="col-lg-3 control-label">Bio:</label>
                <div class="col-lg-8">
                  <textarea
                    maxLength={120}
                    class="form-control"
                    type="text"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">Socials:</label>
                <div className="row ml-4">
                  <div className="col-lg-1">
                    <i
                      class="fa fa-instagram mt-1"
                      aria-hidden="true"
                      style={{ fontSize: "30px" }}
                    ></i>{" "}
                  </div>
                  <div class="col-lg-5">
                    <input
                      maxLength={120}
                      class="form-control"
                      type="text"
                      value={insta}
                      onChange={(e) => {
                        setInsta(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row ml-4">
                  <div className="col-lg-1">
                    <i
                      class="fa fa-facebook mt-1"
                      aria-hidden="true"
                      style={{ fontSize: "30px" }}
                    ></i>{" "}
                  </div>
                  <div class="col-lg-5">
                    <input
                      maxLength={120}
                      class="form-control"
                      type="text"
                      value={fb}
                      onChange={(e) => {
                        setFb(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row ml-4">
                  <div className="col-lg-1">
                    <i
                      class="fa fa-twitter mt-1"
                      aria-hidden="true"
                      style={{ fontSize: "30px" }}
                    ></i>{" "}
                  </div>
                  <div class="col-lg-5">
                    <input
                      maxLength={120}
                      class="form-control"
                      type="text"
                      value={tw}
                      onChange={(e) => {
                        setTw(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row ml-4">
                  <div className="col-lg-1">
                    <i
                      class="fa fa-youtube mt-1"
                      aria-hidden="true"
                      style={{ fontSize: "30px" }}
                    ></i>{" "}
                  </div>
                  <div class="col-lg-5">
                    <input
                      maxLength={120}
                      class="form-control"
                      type="text"
                      value={yt}
                      onChange={(e) => {
                        setYt(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row ml-4">
                  <div className="col-lg-1">
                    <i
                      class="fa fa-pinterest mt-1"
                      aria-hidden="true"
                      style={{ fontSize: "30px" }}
                    ></i>{" "}
                  </div>
                  <div class="col-lg-5">
                    <input
                      maxLength={120}
                      class="form-control"
                      type="text"
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary ml-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default EditArtistProfile;
