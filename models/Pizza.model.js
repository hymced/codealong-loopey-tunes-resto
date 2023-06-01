const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

//create Schema with validation/validators
const pizzaSchema = new Schema({
    title2: String,
    title: {
        type: String,
        required: true,
        default: "Unknown Pizza",
        unique: true,
        minlength: 1,
        trim: true,
    },
    price2: Number,
    price: {
        type: Number,
        required: true,
        default: false,
        min: 1,
    },
    isVeggie: Boolean,
    dough: {
        type: String,
        enum: ["classic", "super thick", "extra thin", "with cheese", "with garlic"]
    },
    ingredients: [String],
    imageFile: String
})

//create Model
const Pizza = mongoose.model("Pizza", pizzaSchema); // capitalized variable name by convention

module.exports = Pizza;