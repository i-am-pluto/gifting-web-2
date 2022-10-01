const Orders = require("../Models/orders/OrdersModel");
const { addOrderToCustomer } = require("./CustomerService");
const orderRepository = require("./../Repositories/OrdersRepository");
const { getProductById } = require("../Repositories/ProductRepository");

const createAnOrder = async(cart_item, cart, user_id, address, sessionID) => {
    const order = new Orders({
        order_amount: cart_item.price * cart_item.quantity,
        order_items: { cart_item_id: cart_item.id, cart_id: cart.id },
        order_address: address,
        payment_intent_id: sessionID,
        c_id: user_id,
    });
    const savedOrder = await order.save();

    await addOrderToCustomer(user_id, order.id);

    return savedOrder;
};

const buyNow = async(productid, varient, customization, user_id) => {
    const product = await getProductById(productid);
    const artist = product.artist.artist_id;
    console.log(productid);
    const order = new Orders({
        order_amount: varient.varient_price,
        order_items: productid,
        stripe_price_id: varient.varient_stripe_id,
        c_id: user_id,
        a_id: artist,
        customization: customization,
    });

    const savedOrder = await order.save();
    console.log(savedOrder);
    console.log(order);
    let index = product.varients.findIndex((el) => {
        return el.varient_stripe_id === varient.varient_stripe_id;
    });
    if (index !== -1) product.varients[index].varient_stocks--;
    product.save();
    return savedOrder;
};

const getOrderByPaymentIntent = async(payment_intent_id) => {
    const order = await Orders.findOne({ payment_intent_id: payment_intent_id });
    return order;
};

const markOrderPaid = async(order) => {
    order.status = "PAYMENT_RECIEVED";
    const savedOrder = await order.save();
    return savedOrder;
};

// get order detorder_idails
const getOrderById = async(order_id) => {
    const order = orderRepository.getOrderById(order_id);
    return order;
};

// set order dispatched
const setOrderDispatched = async(order_id) => {
    const order = orderRepository.getOrderById(order_id);
    order.status = "DISPATCHED";
    const savedOrder = await order.save();
    return savedOrder;
};

// set order delivered
const setOrderDelivered = async(order_id) => {
    const order = orderRepository.getOrderById(order_id);
    order.status = "DELIVERED";
    const savedOrder = await order.save();
    return savedOrder;
};

// end the order
const setOrderCompleted = async(order_id) => {
    const order = orderRepository.getOrderById(order_id);
    order.status = "COMPLETED";
    const savedOrder = await order.save();
    return savedOrder;
};

module.exports = {
    createAnOrder,
    getOrderByPaymentIntent,
    getOrderById,
    setOrderCompleted,
    setOrderDelivered,
    setOrderDispatched,
    buyNow,
};