import React from "react";

function InformationTable({ informationTable }) {
  let Table = [];
  console.log(informationTable);
  for (var i in informationTable) {
    Table.push([i, informationTable[i]]);
  }
  console.log(Table);

  return (
    <div className="container d-flex justify-content-center mt-5">
      {/* <div className="row"> */}
      <div className="col-md">
        <div
          className="table table-bordered"
          style={{ maxWidth: "fit-content" }}
        >
          <thead className="thead-dark">
            <tr>
              <th className="">Key</th>
              <th>Info</th>
            </tr>
          </thead>
          {Table.map((e) => {
            return (
              <tr>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
              </tr>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default InformationTable;
