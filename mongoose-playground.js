// const {mongoose, Schema} = require("mongoose");
const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;
// Schema is a Class

const Pizza = require("./models/Pizza.model.js");

// no need to use exports for a JSON file, require is enough

// default MongoDB port = 27017

// mongoose.connect("mongodb://localhost:27017/loopeyTunesResto") 
// does not work, system cannot resolve localhost to the loopback ip address...
// MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
// ping localhost
// but it works in MondoDB Compass...
// C:\Windows\System32\drivers\etc\hosts
// this is because the mongosh (MongoDB shell) itself uses 127.0.0.1
// $ mongosh
// Current Mongosh Log ID: 6478738e969dea7dfed1157a
// Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.1
// Using MongoDB:          6.0.5
// Using Mongosh:          1.8.1

// //create Schema
// const pizzaSchema = new Schema({ title: String});
// //create Model
// const Pizza = mongoose.model("Pizza", pizzaSchema); // capitalized variable name by convention

mongoose.connect("mongodb://127.0.0.1:27017/loopeyTunesResto")
// db does not need to be creadted in MongoDB Compass at this point, it will be created once a document is added

    .then((response) => {
        console.log(`Connected! Database Name: "${response.connections[0].name}"`);
        
        const pizzaOne = {
            title: "margarita2",
            price: 12,
            isVeggie: true,
            dough: "classic",
        };

        //create a new document (a new pizza)
        return Pizza.create(pizzaOne)
    })
    .then( (pizzaFromDB) => {
        console.log("a new pizza was created with id...", pizzaFromDB._id);
        return Pizza.find({title: "margarita"})
    })
    .then( (pizzasArr) => {
        console.log("I currently have this amount of pizzas...", pizzasArr.length);
        console.log(pizzasArr);

        // Model.findByIdAndUpdate(id, update [, options])
        // Pizza.findByIdAndUpdate("6478ab28253a612d34d1b97f", {price: 20}, { returnDocument: 'after' })
        // Pizza.findByIdAndUpdate("6478ab28253a612d34d1b97f", {price: 20}, { new: true })
        return Pizza.updateMany({price: {$gt: 12} }, {dough: "with garlic"});
    })
    .then( (result) => {
        console.log(result)
    })
    .finally()
    .catch((err) => console.error("Error connecting to DB", err));
