const express = require("express");
const path = require("path");
const crypto = require("crypto");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const routes = require("./routes");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { retrieveSession } = require("./Services/StripeAccnt");
const { getOrderByPaymentIntent } = require("./Services/OrderService");
const { removeProductFromCart } = require("./Repositories/CartRepository");
const cartService = require("./Services/CartService");
const artistService = require("./Services/ArtistService");

require("dotenv").config();

const app = express();

connectDB();
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    if ("OPTIONS" == req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.get("/", (req, res) => {
    res.end("Hello WOlrd");
});
/**
 * -------------- SESSION SETUP ----------------
 */

app.use(
    session({
        secret: "secret temp",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1/mydb",
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        },
    })
);
app.use(cookieParser("secret temp"));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// Need to require the entire Passport config module so app.js knows about it
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    // console.log(req.sessionID);
    // console.log(req.body);
    next();
});

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async(request, response) => {
        let event = request.body;
        // Only verify the event if you have an endpoint secret defined.
        // Otherwise use the basic event deserialized with JSON.parse
        if (endpointSecret) {
            // Get the signature sent by Stripe
            const signature = request.headers["stripe-signature"];
            try {
                event = stripe.webhooks.constructEvent(
                    request.body,
                    signature,
                    endpointSecret
                );
            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed.`, err.message);
                return response.sendStatus(400);
            }
        }

        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                console.log(
                    `PaymentIntent for ${paymentIntent.amount} was successful!`
                );
                // Then define and call a method to handle the successful payment intent.
                const order = await getOrderByPaymentIntent(paymentIntent);
                // update the order status to payment recieved
                const updatedOrder = await markOrderPaid(order);
                // delete the item from cart
                await cartService.removeItem(order.cart, order.cart_item);
                // handlePaymentIntentSucceeded(paymentIntent);

                break;
            case "payment_method.attached":
                const paymentMethod = event.data.object;
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                break;
            case "account.updated":
                const account = event.data.object;
                if (account.charges_enabled) {
                    const acc = await artistService.getAccountByStripeAccountId(
                        account.id
                    );
                    await artistService.markAccountEnabled(acc);
                }
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}.`);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send();
    }
);

app.use(routes);

const port = 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});