
// https://github.com/ironhack-loopey-tunes-may2023/loopey-restaurant

/*******************************/
/* config > require > packages */
/*******************************/

const express = require("express"),
      hbs = require("hbs");
      mongoose = require("mongoose")
      bodyParser = require('body-parser')

// const handlebars = require("handlebars");
// const exphbs = require('express-handlebars');

// import express from "express";

const app = express();

app.use(express.static('public')); 
// expose the content of the public directory and make everything inside public
// localhost:3000/images/home.jpg
// https://raw.githubusercontent.com/RemoteRaccoons-Ironhack-Nov-22/ironrestaurant-pizzaForEach/main/public/images/home.jpg

app.use(bodyParser.urlencoded({ extended: true })); // without this package, the body property of the req object received in the middleware functions won't be created/populated

// recent Express versions have built-in middlewares that does the same:
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

/******************/
/* config > views */
/******************/

app.set("views", __dirname + "/views"); // tells our Express app where to look for our views
app.set("view engine", "hbs"); // sets HBS (<> Handlebars) as the template engine

/*********************/
/* config > partials */
/*********************/

hbs.registerPartials(__dirname + "/views/partials"); // tell HBS which directory to use for partials

/********************/
/* config > helpers */
/********************/

// hbs.registerHelper('incHelper', function (value) {
//     return ++value;
// });

// const incHelper = require('./helpers/incHelper.helper.js');
// hbs.registerHelper("incHelper", incHelper);

const helpers = require('./helpers/helpers.js');
// hbs.registerHelper("incHelper", helpers.incHelper);
// hbs.registerHelper("mathHelper", helpers.mathHelper);
hbs.registerHelper(helpers); // must be an array with this syntax, not a single function

// app.get(path, middlewareFunction);
// app.get(path, (req, res, next) => {});

/***************************/
/* config > require > *.js */
/***************************/

const Pizza = require("./models/Pizza.model.js");

/*****************/
/* db connection */
/*****************/

mongoose
    .connect('mongodb://127.0.0.1/loopeyTunesResto')
    .then(x => {
        console.log(`Connected! Database name: "${x.connections[0].name}"`);
    })
    .catch( e => console.log("error connecting to DB", e));

/**********/
/* routes */
/**********/

/*********/
/* about */
/*********/

app.get("/about", function(){
    console.log("request received for /about");
});

/************/
/* homepage */
/************/

// app.get("/", function(request, response, next){
//     console.log("-- request received for HOMEPAGE");
//     response.send("hello world");
// });
app.get("/", (req, res, next) => {
    console.log("-- request received for HOMEPAGE");
    // res.send(`
    //     <h1>Welcome to our amazing restaurant</h1>

    //     <img src="/images/home.jpg" alt="delicious pizzas" />
    // `);
    // res.sendFile(__dirname + "/views/home-page.html")

    const settings = {
        // layout: false,
        // css: "styles.css"
    }

    res.render("home-page", {page: {title: "Homepage"}, ...settings})
});

/***********/
/* contact */
/***********/

app.get("/contact", (req, res, next) => {
    console.log("-- request received for CONTACT");
    // res.sendFile(__dirname + "/views/contact-page.html")
    res.render("contact-page", {page: {title: "Contact"}})
});

/**********/
/* pizzas */
/**********/

// https://pixabay.com/photos/pizza-plate-food-cheese-lunch-3010062/
// https://pixabay.com/photos/pizza-italian-homemade-cheese-3007395/
// https://pixabay.com/photos/pizza-italian-pasta-food-cheese-5179939/

/* */

//
// /**********************/
// /* pizzas > margarita */
// /**********************/
// 
// app.get("/pizzas/margarita", (req, res, next) => {
//     // res.send("page for Margarita")
// 
//     // const pizzaDetails = {
//     //     title: 'Pizza Margarita',
//     //     price: 12,
//     //     recommendedDrink: 'beer',
//     //     imageFile: 'pizza-margarita.jpg',
//     //     ingredients: [
//     //         {
//     //             ingredientName: "tomato sauce",
//     //             calories: 200
//     //         },
//     //         'mozzarella', 'tomato sauce', 'basilicum'
//     //     ],
//     // };
//     // res.render("product", {...pizzaDetails, page: {title: pizzaDetails.title}}) // name of the file without the .hbs extension
//     // // if "layout.hbs" exists, handlebars will use it, and it wall assume that passed "product" is {{{body}}}
//
//     Pizza.findOne({title: "margarita"})
//         .then( (pizzaFromDB) => {
//             res.render("product", pizzaFromDB);
//         })
//         .catch( e => console.log("Error getting pizza from DB: ", e))
//
// });
//
// /*******************/
// /* pizzas > veggie */
// /*******************/
//
// app.get("/pizzas/veggie", (req, res, next) => {
//     // res.send("page for Veggie")
//
//     // const pizzaDetails = {
//     //     title: 'Veggie Pizza',
//     //     price: 15,
//     //     recommendedDrink: 'power smoothie',
//     //     imageFile: 'pizza-veggie.jpg',
//     //     ingredients: ['cherry tomatoes', 'basilicum', 'Olives'],
//     // };
//     // res.render("product", {...pizzaDetails, page: {title: pizzaDetails.title}})
//
//     Pizza.findOne({title: "veggie"})
//         .then( (pizzaFromDB) => {
//             res.render("product", pizzaFromDB);
//         })
//         .catch( e => console.log("Error getting pizza from DB: ", e))
// });
//
// /********************/
// /* pizzas > seafood */
// /********************/
//
// app.get("/pizzas/seafood", (req, res, next) => {
//     // res.send("page for Seafood")
//
//     // const pizzaDetails = {
//     //     title: 'Seafood Pizza',
//     //     // price: 20,
//     //     // https://handlebarsjs.com/guide/builtin-helpers.html
//     //     recommendedDrink: 'white wine',
//     //     imageFile: 'pizza-seafood.jpg',
//     //     ingredients: ['tomato sauce', 'garlic', 'prawn'],
//     // };
//     // res.render("product", {...pizzaDetails, page: {title: pizzaDetails.title}})
//
//     Pizza.findOne({title: "seafood"})
//         .then( (pizzaFromDB) => {
//             res.render("product", pizzaFromDB);
//         })
//         .catch( e => console.log("Error getting pizza from DB: ", e))
// });
//
// /********************/
// /* pizzas > special */
// /********************/
//
// app.get("/pizzas/special", (req, res, next) => {
//     console.log("-- request received for PIZZA SPECIAL");
//     const pizzaType = req.query.type
//     const arr = pizzaType.split(" ")
//     for (let i = 0; i < arr.length; i++) {
//         arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
//     }
//     const pizzaTypeCapitalized = arr.join(" ");
//     res.send("page for Special " + pizzaTypeCapitalized)
// });

/* */

/********************/
/* pizzas > generic */
/********************/

app.get("/pizzas/:pizzaTitle", (req, res, next) => {

    Pizza.findOne({title: req.params.pizzaTitle})
        .then( (pizzaFromDB) => {
            res.render("product", pizzaFromDB);
        })
        .catch( e => console.log("Error getting pizza from DB: ", e))
});

/**********/
/* pizzas */
/**********/

app.get("/pizzas", (req, res, next) => {
    // const maxPrice = req.query.maxPrice
    const {maxPrice} = req.query
    // Pizza.find(maxPrice ? {price: {$lte: req.query.maxPrice}} : {})
    filter = {}
    if (maxPrice) filter = {price: {$lte: Number(req.query.maxPrice)}}
    Pizza.find(filter)
        .then( (pizzasFromDB) => {
            res.render("product-list", {pizzasArr: pizzasFromDB});
        })
        .catch( e => console.log("Error getting pizza from DB: ", e))
});

/*********/
/* login */
/*********/

app.post("/login", (req, res, next) => {
    if (req.body.pwd === "azerty") {
        console.log("ok")
        // res.redirect("/")
        res.sendStatus(204) // No Content
    } else {
        res.send("wrong password!")
    }
});

/******************/
/* express listen */
/******************/

const port = 3000
app.listen(port, () => {console.log(`server now listening on port ${port}: http://localhost:${port}/ or http://127.0.0.1:${port}/`)});
