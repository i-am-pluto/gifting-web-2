import React, { useState } from "react";

function ProductCustomize({ customization }) {
  let [readOnly, setReadOnly] = useState();
  if (!customization) {
    customization = "Attach a custom message";
  }

  return (
    <div className="container">
      <div
        className="card-footer py-3 border-0"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <p style={{ fontSize: "15px" }}>
          <b> Q.</b> {customization}
        </p>
        <div className="d-flex flex-start w-100">
          <div className="form-outline w-100">
            <textarea
              className="form-control"
              id="custom-message-textArea"
              rows="3"
              style={{ background: "#fff" }}
              {...readOnly}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="mt-2 pt-1 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary btn-sm mr-2"
          id="attach-message-button"
          onClick={(e) => {
            if (readOnly) {
              setReadOnly();
              document.getElementById("attach-message-button").innerText =
                "Attach Message";
            } else {
              setReadOnly({ disabled: "..." });
              document.getElementById("attach-message-button").innerText =
                "Edit";
            }
          }}
        >
          Attach Message
        </button>
      </div>
    </div>
  );
}

export default ProductCustomize;
