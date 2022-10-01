import React from "react";

function InformationTable({ infoText1, infoText2, informationTable }) {
  let Table = [];

  for (var i in informationTable) {
    Table.push([i, informationTable[i]]);
  }
  console.log(Table);

  return (
    <div className="container d-flex justify-content-center mt-5">
      {/* <div className="row"> */}
      <div className="col-sm">{infoText1}</div>
      <div className="col-sm">
        <div className="table">
          <thead>
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
      <div className="col-sm">{infoText2}</div>
      {/* </div> */}
    </div>
  );
}

export default InformationTable;
