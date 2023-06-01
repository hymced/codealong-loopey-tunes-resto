
// https://github.com/ironhack-loopey-tunes-may2023/loopey-restaurant

/**********/
/* config */
/**********/

const express = require("express"),
      hbs = require("hbs");

// const handlebars = require("handlebars");
// const exphbs = require('express-handlebars');

// import express from "express";

const app = express();

app.use(express.static('public')); 
// expose the content of the public directory and make everything inside public
// localhost:3000/images/home.jpg
// https://raw.githubusercontent.com/RemoteRaccoons-Ironhack-Nov-22/ironrestaurant-pizzaForEach/main/public/images/home.jpg

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

/**********************/
/* pizzas > margarita */
/**********************/

app.get("/pizzas/margarita", (req, res, next) => {
    // res.send("page for Margarita")

    const pizzaDetails = {
        title: 'Pizza Margarita',
        price: 12,
        recommendedDrink: 'beer',
        imageFile: 'pizza-margarita.jpg',
        ingredients: [
            {
                ingredientName: "tomato sauce",
                calories: 200
            },
            'mozzarella', 'tomato sauce', 'basilicum'
        ],
    };
    res.render("product", {...pizzaDetails, page: {title: pizzaDetails.title}}) // name of the file without the .hbs extension
    // if "layout.hbs" exists, handlebars will use it, and it wall assume that passed "product" is {{{body}}}
});

/*******************/
/* pizzas > veggie */
/*******************/

app.get("/pizzas/veggie", (req, res, next) => {
    // res.send("page for Veggie")

    const pizzaDetails = {
        title: 'Veggie Pizza',
        price: 15,
        recommendedDrink: 'power smoothie',
        imageFile: 'pizza-veggie.jpg',
        ingredients: ['cherry tomatoes', 'basilicum', 'Olives'],
    };
    res.render("product", {...pizzaDetails, page: {title: pizzaDetails.title}})
});

/********************/
/* pizzas > seafood */
/********************/

app.get("/pizzas/seafood", (req, res, next) => {
    // res.send("page for Seafood")

    const pizzaDetails = {
        title: 'Seafood Pizza',
        // price: 20,
        // https://handlebarsjs.com/guide/builtin-helpers.html
        recommendedDrink: 'white wine',
        imageFile: 'pizza-seafood.jpg',
        ingredients: ['tomato sauce', 'garlic', 'prawn'],
    };
    res.render("product", {...pizzaDetails, page: {title: pizzaDetails.title}})
});

/********************/
/* pizzas > special */
/********************/

app.get("/pizzas/special", (req, res, next) => {
    console.log("-- request received for PIZZA SPECIAL");
    const pizzaType = req.query.type
    const arr = pizzaType.split(" ")
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const pizzaTypeCapitalized = arr.join(" ");
    res.send("page for Special " + pizzaTypeCapitalized)
});

/******************/
/* express listen */
/******************/

const port = 3000
app.listen(port, () => {console.log(`server now listening on port ${port}: http://localhost:${port}/ or http://127.0.0.1:${port}/`)});
