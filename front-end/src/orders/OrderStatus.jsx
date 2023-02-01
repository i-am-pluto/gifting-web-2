import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./OrderStatus.css";

const ActionButton = ({ order }) => {
  const [b, setB] = useState();
  const [artist, setArtist] = useState({});

  const getArtist = async () => {
    if (!order.order_item) return;

    const response = await fetch(
      `http://localhost:5000/api/artist/${order.a_id}`,
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
      alert("Something went wrong");
      return;
    }
    setArtist(data);
  };

  useEffect(() => {
    getArtist();
  }, [order]);

  useEffect(() => {
    if (order.artist && order.order_status === "PAYMENT_RECIEVED") {
      setB(
        <button
          className="btn btn-dark mb-4"
          style={{ width: "30%" }}
          onClick={async (e) => {
            const response = await fetch(
              `http://localhost:5000/api/order/${order._id}/markorderdispatched`,
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
              alert("something went wrong");
            }
          }}
        >
          Mark Order Dispatched
        </button>
      );
    } else if (order.customer === true && order.order_status === "DISPATCHED") {
      setB(
        <button
          className="btn btn-dark mb-4"
          style={{ width: "30%" }}
          onClick={async (e) => {
            const response = await fetch(
              `http://localhost:5000/api/order/${order._id}/markorderdelivered`,
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
              alert("something went wrong");
            }
          }}
        >
          Mark Order Delivered
        </button>
      );
    } else {
      setB(
        <button className="btn btn-dark mb-4 disabled" style={{ width: "30%" }}>
          No Actions Available
        </button>
      );
    }
  }, [order]);

  const socials = [];

  if (artist.socials) {
    for (var i in artist.socials) {
      socials.push([i, artist.socials[i]]);
    }
  }

  return (
    <div className=" container">
      <div className="row justify-content-center">
        <div className="row justify-content-center">{b}</div>
        <div className="row justify-content-center">Contact Artist: </div>
        <div className="socials d-flex justify-content-evenly mb-5">
          {socials.map((s, i) => {
            return (
              <a href={s[1]}>
                <i class={`btn fa fa-${s[0]}`}></i>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const OrderDetails = ({ order }) => {
  const [product, setProduct] = useState({
    artist: { artist_name: "worldonPencil" },
  });

  const [artist, setArtist] = useState({});

  const getProduct = async () => {
    if (!order.order_item) return;

    const response = await fetch(
      `http://localhost:5000/api/product/${order.order_item.product_id}`,
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
      alert(data.message);
      return;
    }

    setProduct(data);
  };

  useEffect(() => {
    getProduct();
  }, [order]);

  const [varient, setVarient] = useState({});

  const getVarient = async () => {
    const response = await fetch(
      `http://localhost:5000/api/product/varient/${order.order_item.varient_id}`,
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
      alert(data.message);
      return;
    }

    setVarient(data);
  };

  useEffect(() => {
    getVarient();
  }, [product]);

  console.log(varient);

  return (
    <>
      <div className="container">
        <h2 className="mb-5">
          Order <b> Details</b>
        </h2>

        <div className="mb-5 card container">
          <div className="bg-light d-flex align-items-center justify-content-center m-3 p-2">
            <img
              src={product.main_image_url}
              alt=""
              srcset=""
              className="product-order-image"
            />
          </div>
          <div className="d-flex flex-column">
            <div>
              <h3 style={{ textAlign: "center" }}>
                <b>{product.product_name}</b>
              </h3>
            </div>
            <div
              style={{ textAlign: "center", marginTop: "-10px" }}
              className="mb-1"
            >
              <i>{product.artist.artist_name}</i>
            </div>
            <div className="text-center" style={{ fontSize: "smaller" }}>
              {varient.varient_name}
            </div>
            <div className="text-center font-weight-bold mb-3">
              ₹{varient.varient_price}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="mb-5">
          Customi<b>zation</b>
        </h2>
        <div className="card container p-3">
          <b>Q. {product.customization}</b>
          {order.customization}
        </div>
      </div>

      <div className="container">
        <h4 className="mb-3 text-center">
          Acti<b>ons :</b>
        </h4>
        <ActionButton order={order} />
      </div>
    </>
  );
};

const OrderStatus = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(false);
  const [order, setOrder] = useState({});
  const fetchOrder = async () => {
    const response = await fetch(`http://localhost:5000/api/order/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (data.success === false) {
      alert(data.message);
      return;
    }

    if (data.artist) {
      setArtist(true);
    }
    setOrder(data);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const orderStatusLine = () => {
    let status = [true, true, false, false];

    const ss = [
      "PAYMENT_NOT_RECIEVED",
      "PAYMENT_RECIVED",
      "DISPATCHED",
      "DELIVERED",
    ];
    console.log(ss.indexOf(order.order_status));
    if (ss.indexOf(order.order_status) !== -1) {
      status = [];
      for (var i = 0; i <= ss.indexOf(order.order_status); i++) {
        status.push(true);
      }
      for (var i = ss.indexOf(order.order_status); i < ss.length; i++) {
        status.push(false);
      }
    }

    return (
      <div className="order-status-line container">
        {status.map((el, i) => {
          if (el === true) {
            return (
              <div className="tick">
                <i class="fa fa-circle" aria-hidden="true"></i>{" "}
              </div>
            );
          } else if (el === false) {
            return (
              <div className="cross">
                <i class="fa fa-circle-o bg-light" aria-hidden="true"></i>{" "}
              </div>
            );
          }
        })}
      </div>
    );
  };
  const orderStatusLineLabel = () => {
    const ss1 = [
      "Order Confirmed",
      "Payment Recieved",
      "Out For Delivery",
      "Delivered",
    ];

    return (
      <div className="order-status-label container">
        {ss1.map((el, i) => {
          return (
            <div
              className="legend"
              style={{
                height: "max-content",
                marginTop: "-10px",
                fontSize: "smaller",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              {el}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="margin-set-top">
      <h1 style={{ marginTop: "120px", textAlign: "center" }}>
        Order <b> Status</b>
      </h1>
      <hr />
      <div className="row mt-5">{orderStatusLine()}</div>
      <div className="row mb-5">{orderStatusLineLabel()}</div>
      <hr />
      <OrderDetails order={order} />
    </div>
  );
};

export default OrderStatus;
