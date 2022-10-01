import React from "react";

function InformationTableEdit({ informationTable }) {
  let Table = [];

  for (var i in informationTable) {
    Table.push([i, informationTable[i]]);
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      {/* <div className="row"> */}
      <div className="col-sm">
        <textarea
          maxLength={200}
          className="form-control"
          id="product-info1-edit"
          placeholder="Enter Brief Descriptions of Your Product"
          style={{ height: "100%" }}
        />
      </div>
      <div className="col-sm">
        <div className="table">
          <thead>
            <tr>
              <th className="">Key</th>
              <th>Info</th>
            </tr>
          </thead>
          {Table.map((e, i) => {
            let id;
            if (i === 0) {
              id = "product-info-package-edit";
            } else if (i === 1) {
              id = "product-info-weight-edit";
            } else if (i === 2) {
              id = "product-info-manufacture-edit";
            }
            return (
              <tr>
                <td>{e[0]}</td>
                <td>
                  <input
                    type="text"
                    name={e[0]}
                    placeholder={e[1]}
                    id={id}
                    className="form-control"
                  />
                </td>
              </tr>
            );
          })}
        </div>
      </div>
      <div className="col-sm">
        <textarea
          maxLength={200}
          className="form-control"
          id="product-info2-edit"
          placeholder="Enter Brief Descriptions of Your Product"
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}

export default InformationTableEdit;
