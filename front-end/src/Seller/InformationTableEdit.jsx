import React from "react";

function InformationTableEdit({ informationTable }) {
  let Table = [];

  for (var i in informationTable) {
    Table.push([i, informationTable[i]]);
  }

  return (
    <div>
      {/* <div className="row"> */}
      <center>
        <div className="container row justify-content-center mt-5"></div>
        <div className="col-md">
          <div
            className="table table-bordered"
            style={{ maxWidth: "fit-content" }}
          >
            {" "}
            <thead className="thead-dark">
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
      </center>
    </div>
  );
}

export default InformationTableEdit;
