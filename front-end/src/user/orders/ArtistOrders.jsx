import React, { useEffect, useState } from "react";

function ArtistOrders() {
  const [data, setData] = useState([]);

  const status = {
    TRANSACTION_FAILED: 1,
    PAID: 2,
    DISPATCHED: 3,
    DELIVERED: 4,
    END: 5,
  };

  const template = {
    sno: 1,
    date: Date.now(),
    status: status.PAID,
    customer_name: "Gujjodhar purohit",
  };

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch("http://localhost:5000/api/orders/artist", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success !== undefined) {
        const list = [];
        data.array.forEach((order, i) => {
          list.push({
            sno: i,
            date: order.date,
            status: order.status,
            customer_name: order.customer_name,
            order_id: order._id,
          });
        });
      }
    };

    getOrders();
  }, []);

  return (
    <div>
      <div className="container mt-5 px-2">
        <div className="mb-2 d-flex justify-content-between align-items-center"></div>
        <div className="table-responsive">
          <center>
            <table className="table table-responsive table-borderless">
              <thead>
                <tr className="bg-light">
                  <th scope="col" width="5%">
                    Sno
                  </th>
                  <th scope="col" width="20%">
                    Date
                  </th>
                  <th scope="col" width="10%">
                    Status
                  </th>
                  <th scope="col" width="20%">
                    Customer
                  </th>
                  <th scope="col" width="20%">
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, i) => {
                  return (
                    <tr>
                      <th scope="row">i</th>
                      <td>el.date</td>
                      <td>
                        <i className="fa fa-check-circle-o green"></i>
                        <span className="ms-1">el.status</span>
                      </td>
                      <td>el.customer_name</td>
                      <td>
                        <a
                          href={`/${el.order_id}/artist`}
                          className="btn-outline-primary"
                        >
                          View Order
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </center>
        </div>
      </div>
    </div>
  );
}

export default ArtistOrders;
