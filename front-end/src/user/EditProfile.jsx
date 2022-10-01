import React, { useState } from "react";

export const EditProfile = ({ profile_user }) => {
  const [f_name, setFname] = useState(profile_user.name.f_name);
  const [l_name, setLname] = useState(profile_user.name.l_name);
  const [email, setEmail] = useState(profile_user.email);
  const [phoneNumber, setPhoneNumber] = useState(profile_user.phone);
  const [pfp, setPfp] = useState();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {};
    user.name = {};
    user.name.f_name = f_name;
    user.name.l_name = l_name;
    user.email = email;
    user.phone = phoneNumber;

    if (!f_name || !email || !phoneNumber) {
      alert("Please Fill the Required Fields");
      console.log(alert);
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid Email Address");
      console.log("2");
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/user/${profile_user.id}/edit`,
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
    // console.log(pfp);
    if (pfp) {
      const responsePfp = await fetch(
        `http://localhost:5000/api/user/${profile_user.id}/setprofilepic`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          body: JSON.stringify({ data: pfp }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const d2 = await responsePfp.json();
      if (!d2.success) {
        alert(d2.message);
      }
      window.location.reload();
    }
  };

  return (
    <div>
      <div class="container bootstrap snippets bootdey">
        <h1 class="text-primary">Edit Profile</h1>
        <hr />
        <div class="row">
          <div class="col-md-3">
            <div class="text-center">
              <img
                class="avatar img-circle img-thumbnail"
                src={profile_user.pfp_url}
                alt="avatar"
                id="profile-pic"
              />
              <h6>Profile Picture</h6>
              <input
                type="file"
                class="form-control"
                onChange={(input) => {
                  console.log("hi");
                  var reader = new FileReader();
                  reader.readAsDataURL(input.target.files[0]);

                  reader.onload = (e) => {
                    document
                      .getElementById("profile-pic")
                      .setAttribute("src", e.target.result);
                    console.log(reader.result);
                    setPfp(reader.result);
                  };
                }}
              />
            </div>
          </div>

          <div class="col-md-9 personal-info">
            <form class="form-horizontal" onSubmit={handleSubmit}>
              <div class="form-group">
                <label class="col-lg-3 control-label">First name:</label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
                    type="text"
                    value={f_name}
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">Last name:</label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
                    type="text"
                    value={l_name}
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">Email:</label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">Phone Number:</label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
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
              <button
                type=""
                className="btn btn-primary ml-3"
                onClick={handleSubmit}
              >
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
