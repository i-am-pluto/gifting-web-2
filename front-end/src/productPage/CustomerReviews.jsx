import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./CustomerReview.css";
function CustomerReviews({ product_id }) {
  let [comments, setComments] = useState([]);
  let [loadMoreCounter, setLoadMoreCounter] = useState(0);
  let [disable, setDisable] = useState("");
  const getProductReviews = async () => {
    console.log(product_id);
    const response = await fetch(
      `http://localhost:5000/api/reviews/${product_id}/${loadMoreCounter}`,
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
    console.log(data);
    if (!data.success) {
      alert("Couldnt load reviews");

      return;
    }
    console.log(data.reviews);
    setComments(data.reviews);

    if (data.reviews.length < 5) {
      setDisable({ disabled: "..." });
    } else {
      setDisable("");
    }
  };
  useEffect(() => {
    getProductReviews();
  }, [loadMoreCounter]);

  const addComment = async (e) => {
    if (e.keyCode === 13) {
      const comment = e.target.value;

      const response = await fetch(
        `http://localhost:5000/api/reviews/${product_id}/add`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ comment }),
        }
      );
      const data = await response.json();

      if (data.success === false) {
        alert("Failed To add the review");
        return;
      }

      e.target.value = "";
      alert("The review was added to the product");
      getProductReviews();
    }
  };
  const upvote = async (e) => {
    let but_id = e.target.id;
    let count_id = "review-upvote-" + e.target.id.substring(18, 19);
    let review_id = e.target.id.substring(20);
    if (document.getElementById(but_id).innerText === "upvote?") {
      // send upvote request
      const response = await fetch(
        `http://localhost:5000/api/reviews/${review_id}/upvote`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!data.success) {
        alert("failed");
        return;
      }

      document.getElementById(but_id).innerText = "downvote?";
      document.getElementById(count_id).innerText =
        Number(document.getElementById(count_id).innerText) + 1;
    } else {
      // send dowvote request
      const response = await fetch(
        `http://localhost:5000/api/reviews/${review_id}/downvote`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!data.success) {
        alert("failed");
        return;
      }

      document.getElementById(but_id).innerText = "upvote?";
      document.getElementById(count_id).innerText =
        Number(document.getElementById(count_id).innerText) - 1;
    }
  };

  return (
    <div>
      <div class="container justify-content-center mt-5 border-left border-right">
        <div class="d-flex justify-content-center pt-3 pb-2">
          <input
            type="text"
            name="text"
            placeholder="+ Add A Review"
            class="form-control addtxt"
            onKeyUp={addComment}
          />
        </div>
        <div class="d-flex justify-content-center py-2">
          <div class="second py-2 px-2">
            {" "}
            {comments.map((review, i) => {
              let buttonText = "upvote?";
              if (review.isUpvoted) buttonText = "downvote?";

              return (
                <div class="comment-box py-2 px-2">
                  {" "}
                  <span class="text1">{review.comment}</span>
                  <div class="d-flex justify-content-between py-1 pt-2">
                    <div>
                      <img src={review.pfp_image} width="18" alt="alt" />
                      <span class="text2">{review.author}</span>
                    </div>
                    <div>
                      <button className="btn" onClick={upvote}>
                        <span
                          class="text3"
                          id={"review-upvote-btn-" + i + "-" + review.id}
                        >
                          {buttonText}
                        </span>
                      </button>
                      <span class="thumbup">
                        <i class="fa fa-thumbs-o-up"></i>
                      </span>
                      <span class="text4" id={"review-upvote-" + i}>
                        {review.upvotes}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container">
          <button
            className="col btn btn-warning mb-5"
            onClick={(e) => {
              setLoadMoreCounter(loadMoreCounter + 1);
            }}
            {...disable}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerReviews;
