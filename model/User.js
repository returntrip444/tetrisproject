const mongoose = require("../config/mongoose");
const { mongo } = require("../config/mongoose");

const { Schema } = mongoose;
const { Types } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    score: {
        type: Number,
        required: true,
    },

});

const User = mongoose.model("User", userSchema);

module.exports = User;