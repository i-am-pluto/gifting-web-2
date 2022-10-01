const { default: mongoose } = require("mongoose");
const Orders = require("../Models/orders/OrdersModel");

// get order by order_id
const getOrderById = async(order_id) => {
    const order = Orders.findById(order_id);
    return order;
};

// get all orders by customer_id

// update order status

// register order

// delete order

module.exports = {
    getOrderById,
};