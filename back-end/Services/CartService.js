const mongoose = require("mongoose");
const Cart = require("../Models/cart/CartModel");
const userRepository = require("../Repositories/UserRepository");
const cartRepository = require("../Repositories/CartRepository");
const { createCheckOutSession } = require("./StripeAccnt");
const Orders = require("../Models/orders/OrdersModel");
const { createAnOrder } = require("./OrderService");

const createACart = async() => {
    const cart = new Cart();
    const savedCart = await cart.save();
    return savedCart;
};

const getCartById = async(cart_id) => {
    const cart = await Cart.findById(cart_id);
    return cart;
};
const getCartItemById = async(cart_item_id, cart_id) => {
    const cart_item = await cartRepository.getCartItemById(
        await getCartById(cart_id),
        cart_item_id
    );
    return cart_item;
};

// remove item
const removeItem = async(cart_id, cart_item_id) => {
    const cart = await getCartById(cart_id);
    const newCart = await cartRepository.removeProductFromCart(
        cart,
        cart_item_id
    );
    return newCart;
};

// update quantity
const updateQuantity = async(cart_id, product_json) => {
    const cart = await getCartById(cart_id);
    const newCart = await cartRepository.updateCartItem(
        cart,
        product_json,
        cart_item_id
    );
    return newCart;
};

// buy a cart
const buyCartItemSession = async(cart_id, cart_item_id, user_id, address) => {
    const cart_item = await getCartItemById(cart_item_id, cart_id);
    const cart = await getCartById(cart_id);

    const CheckOutSession = await createCheckOutSession(cart_item);

    //create an order
    const order = await createAnOrder(
        cart_item,
        cart,
        user_id,
        address,
        CheckOutSession.payment_intent
    );
    return CheckOutSession;
};

const confirmPayment = async(cart_id, cart_item_id) => {};

module.exports = {
    createACart,
    getCartById,
};