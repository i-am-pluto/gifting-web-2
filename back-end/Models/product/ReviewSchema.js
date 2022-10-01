const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    rating: Number,
    comment: {
        type: String,
        required: true,
    },
    user_id: { type: mongoose.mongo.ObjectId, ref: "Customer", required: true },
    upvotes: Number,
    upvoted_by: [{
        type: mongoose.mongo.ObjectId,
        ref: "User",
    }, ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = ReviewSchema;