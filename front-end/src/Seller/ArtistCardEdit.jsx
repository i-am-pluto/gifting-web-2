import React from "react";

function ArtistCardEdit({ Artist }) {
  const pfp_image = Artist.pfp_url;
  const cover_image = Artist.cover_url;
  const artist_name = Artist.artist_name;
  let artist_followers = Artist.follower_count;
  const artist_bio = Artist.bio;
  let c = 0;
  console.log(Artist);
  while (parseInt(artist_followers / 1000) > 0) {
    artist_followers /= 1000;
    c++;
  }
  if (c > 1) {
    artist_followers = String(artist_followers).substring(0, 4) + "M";
  } else {
    artist_followers = String(artist_followers).substring(0, 4) + "K";
  }
  return (
    <div>
      <div className="container padding">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="cover-img-artist-card">
                <img
                  className="card-img-top"
                  src={cover_image}
                  alt="CoverImage"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body little-profile text-center">
                <div className="profile-img">
                  <a href={"/profile/" + Artist.artist_id}>
                    <img className="link-profile" src={pfp_image} alt="user" />
                  </a>
                </div>
                <a href={"/profile/" + Artist.artist_id}>
                  <h3 className="m-b-0 btn link-profile">{artist_name}</h3>
                </a>
                <p>{artist_bio}</p>{" "}
                <a
                  href="javascript:void(0)"
                  className="m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded"
                  data-abc="true"
                >
                  Follow
                </a>
                <div className="row text-center m-t-20 d-flex justify-content-center">
                  <div className="col-lg-4 col-md-4 m-t-20">
                    <h3 className="m-b-0 font-light">{artist_followers}</h3>
                    <small>Followers</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistCardEdit;
