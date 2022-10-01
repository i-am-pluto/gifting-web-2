import React from "react";
import { useState } from "react";
import "./CustomerReview.css";
function CustomerReviews({ Reviews }) {
  let [comments, setComments] = useState(Reviews);

  function addComment(e) {
    if (e.keyCode === 13) {
      let newState = [...comments];
      newState.unshift({
        author: "Daddy",
        upvotes: 20,
        Review: e.target.value,
        // pfp_image:
        //   "https://pr0.nicelocal.in/6qdaxqt5l9uP8UCWsYwkyg/220x440,q85/4px-BW84_n0QJGVPszge3NRBsKw-2VcOifrJIjPYFYkOtaCZxxXQ2auZQCd9fMUEh5Lz3pfPAmSVLA-JtmXcbxXM8bMlH9xJb6NgdQHuDCXtnfhdR-jzLg",
      });
      e.target.value = "";
      setComments(newState);
    }
  }
  function upvote(e) {
    let but_id = e.target.id;
    let count_id = "review-upvote-" + e.target.id.substring(18);

    if (document.getElementById(but_id).innerText === "upvote?") {
      document.getElementById(but_id).innerText = "downvote?";
      document.getElementById(count_id).innerText =
        Number(document.getElementById(count_id).innerText) + 1;
    } else {
      document.getElementById(but_id).innerText = "upvote?";
      document.getElementById(count_id).innerText =
        Number(document.getElementById(count_id).innerText) - 1;
    }
  }

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
              return (
                <div class="comment-box py-2 px-2">
                  {" "}
                  <span class="text1">{review.Review}</span>
                  <div class="d-flex justify-content-between py-1 pt-2">
                    <div>
                      <img src={review.pfp_image} width="18" />
                      <span class="text2">{review.author}</span>
                    </div>
                    <div>
                      <button className="btn" onClick={upvote}>
                        <span class="text3" id={"review-upvote-btn-" + i}>
                          upvote?
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
      </div>
    </div>
  );
}

export default CustomerReviews;
