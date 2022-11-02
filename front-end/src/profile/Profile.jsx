import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductsOfArtist from "./ProductsOfArtist";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import "./Profile.css";
function Profile() {
  let [buttonText, setButtonText] = useState("Followed");
  function change(e) {
    if (buttonText === "Followed") setButtonText("Unfollow");
  }
  function change2(e) {
    if (buttonText === "Unfollow") setButtonText("Followed");
  }

  let [profile_user, setProfile_user] = useState({
    name: "Lana Rhodes",
    bio: "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae quibusdam illum perspiciatis nemo, eius dignissimos adipisci animi quos quisquam esse? Suscipit voluptas dolores corrupti blanditiis maxime ratione nemo alias consequuntur.",
    follower_count: 321241231,
    socials: {
      facebook: "https://www.fb.com",
      instagram: "https://www.ig.com",
      linkedin: "https://www.linkedin.com",
    },
    cover_url:
      "https://hdwallsource.com/img/2021/8/lana-rhoades-sexy-wallpaper-73804-76479-hd-wallpapers.jpg",
    pfp_url:
      "https://i.pinimg.com/originals/63/a8/45/63a845bfa536ec51341e74691b4d5796.png",
  });

  let [ProductData, setProductData] = useState([
    {
      productId: 2012030,
      name: "A",
      // image:
      // "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2021/05/13/16208974262086.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012039,
      name: "A",
      // image:
      //   "https://qph.fs.quoracdn.net/main-qimg-fca749b950f305ddbf0a4cb2854b6ad1-pjlq",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012041,
      name: "Bb",
      // image:
      //   "https://thumb-lvlt.xhcdn.com/a/2nKm7fgwe2hlaWWPk1zisQ/002/255/315/526x298.4.webp",
      artistName: "SL",
      price: 200,
    },
    {
      productId: 2012046,
      name: "A",
      // image:
      //   "https://i1.sndcdn.com/artworks-PZOnPSbRx5SlcIfY-QpdgbA-t500x500.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012047,
      name: "A",
      // image:
      //   "https://qph.fs.quoracdn.net/main-qimg-fca749b950f305ddbf0a4cb2854b6ad1-pjlq",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012049,
      name: "A",
      // image:
      //   "https://i1.sndcdn.com/artworks-PZOnPSbRx5SlcIfY-QpdgbA-t500x500.jpg",
      artistName: "LR",
      price: 200,
    },
    {
      productId: 2012047,
      name: "A",
      // image:
      //   "https://qph.fs.quoracdn.net/main-qimg-fca749b950f305ddbf0a4cb2854b6ad1-pjlq",
      artistName: "RR",
      price: 200,
    },
    {
      productId: 2012049,
      name: "A",
      // image:
      //   "https://i1.sndcdn.com/artworks-PZOnPSbRx5SlcIfY-QpdgbA-t500x500.jpg",
      artistName: "LR",
      price: 200,
    },
  ]);
  let followers = profile_user.follower_count;

  console.log(profile_user);
  const { profileId } = useParams();

  const getArtistCard = async () => {
    // should have basic artist information like name followers urls
    // status if the user is followed or not

    const response = await fetch(
      `http://localhost:5000/api/artist/${profileId}/profile`,
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
    if (data.success === false) {
      return;
    }
    console.log(data);
    setProfile_user(data);
  };

  useEffect(() => {
    getArtistCard();
  }, []);

  let c = 0;
  while (parseInt(followers / 1000) > 0) {
    followers /= 1000;
    c++;
  }
  if (c > 1) {
    followers = String(followers).substring(0, 5) + "M";
  } else if (followers < 1000) {
    followers = String(followers);
  } else {
    followers = String(followers).substring(0, 5) + "K";
  }

  let socials = [];

  for (var i in profile_user.socials) {
    socials.push([i, profile_user.socials[i]]);
  }

  return (
    <div style={{ marginTop: "60px" }}>
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
            <b>{profile_user.artist_name}</b>
          </h2>
          <button
            className="mb-3 btn btn-outline-dark"
            onMouseOver={change}
            onMouseLeave={change2}
          >
            {buttonText}
          </button>
          <h6>{profile_user.bio}</h6>
        </center>
        <hr />
        <div>
          <div className="row text-center m-t-20 d-flex justify-content-center">
            <div className="col-lg-4 col-md-4">
              <h3 className="m-b-0 font-light">{followers}</h3>
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

      {/* posts */}

      <ProductsOfArtist products={ProductData} />
    </div>
    //{" "}
  );
}

export default Profile;
