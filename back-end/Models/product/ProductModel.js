const mongoose = require("mongoose");
const ReviewSchema = require("./ReviewSchema");
const Schema = mongoose.Schema;
const productSchema = new Schema({

    product_name: {
        type: String,
        required: true,
    },
    categories: [{
        cat_id: mongoose.mongo.ObjectId,
        cat_name: String,
    }, ],

    // images  { to be added}

    main_image_url: String,
    gift_image_urls: [String],

    artist: {
        artist_name: String,
        artist_followers: Number,
        artist_id: {
            type: mongoose.mongo.ObjectId,
            required: true,
            unique: false,
            ref: "Artist",
        },
    },

    stripe_product_id: String,
    varients: [{
        varient_name: String,
        varient_price: Number,
        varient_stocks: Number,
        varient_stripe_id: String,
    }, ],
    description: {
        type: String,
    },
    info1: {
        type: String,
    },
    info2: {
        type: String,
    },
    informationTable: {
        itemWeight: {
            type: String,
        },
        packageDimension: {
            type: String,
        },
        manufacture: {
            type: String,
        },
    },
    customization: {
        type: String,
    },
    customization_optional: {
        type: Boolean,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    sold_no: {
        type: Number,
        default: 0,
    },
    Reviews: [ReviewSchema],
    created_on: {
        type: Date,
        default: Date.now,
    },
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;