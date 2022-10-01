const ArtistRepository = require("../Repositories/ArtistRepository");
const mongoose = require("mongoose");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const createAccount = async(user_id) => {
    const account = await stripe.accounts.create({ type: "standard" });
    return account;
};

const createAccountLink = async(accnt_id, user_id) => {
    const account_link = await stripe.accountLinks.create({
        account: accnt_id,
        refresh_url: `http://localhost:3000/user/${user_id}/artist`,
        return_url: `http://localhost:3000/user/${user_id}/artist`,
        type: "account_onboarding",
    });
    return account_link;
};

const retrieveAccount = async(accnt_id) => {
    const account = await stripe.accounts.retrieve(accnt_id);
    return account;
};

const createCheckOutSession = async(cart_item) => {
    const session = await stripe.checkout.sessions.create({
        success_url: `${process.env.CLIENT}/`,
        cancel_url: `${process.env.CLIENT}/cart`,
        line_items: { price: cart_item.price_id, quantity: cart_item.quantity },
        mode: "payment",
        payment_intent_data: {
            // application_fee_amount: 123,
            transfer_data: {
                destination: cart_item.artist_stripe_account_id,
            },
        },
    });
    return session;
};

const createPriceObject = async(product, artist_stripe_account_id, price) => {
    console.log(product.id);
    const priceObject = await stripe.prices.create({
        unit_amount: price,
        currency: "inr",
        product: product.id,
    }, {
        stripeAccount: `${artist_stripe_account_id}`,
    });
    return priceObject;
};

const createProductObject = async(product, artist_stripe_account_id) => {
    const newProduct = await stripe.products.create({
        name: product.product_name,
        id: product.id,
        // add images
        images: [
            "https://icon-library.com/images/products-icon/products-icon-25.jpg",
        ],
        url: process.env.CLIENT + "/product/" + product.id,
    }, {
        stripeAccount: `${artist_stripe_account_id}`,
    });
    return {...newProduct };
};

const retrieveSession = async(session_id) => {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return session;
};
const retrievePriceObject = async(price_id) => {};
const retrieveProductObject = async(product_id) => {};

module.exports = {
    createAccount,
    createAccountLink,
    retrieveAccount,
    createPriceObject,
    createCheckOutSession,
    createProductObject,
    retrievePriceObject,
    retrieveProductObject,
    retrieveSession,
};