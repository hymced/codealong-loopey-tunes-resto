const express = require("express");

const app = express();

app.use(express.static('public')); 
// expose the content of the public directory and make everything inside public
// localhost:3000/images/home.jpg

// https://raw.githubusercontent.com/RemoteRaccoons-Ironhack-Nov-22/ironrestaurant-pizzaForEach/main/public/images/home.jpg

// app.get(path, middlewareFunction);
// app.get(path, (req, res, next) => {});

app.get("/about", function(){
    console.log("request received for /about");
});

// app.get("/", function(request, response, next){
//     console.log("request received for HOMEPAGE");
//     response.send("hello world");
// });
app.get("/", (req, res, next) => {
    console.log("request received for HOMEPAGE");
    // res.send(`
    //     <h1>Welcome to our amazing restaurant</h1>

    //     <img src="/images/home.jpg" alt="delicious pizzas" />
    // `);
    res.sendFile(__dirname + "/views/home-page.html")
});

app.get("/contact", (req, res, next) => {
    console.log("request received for CONTACT");
    res.sendFile(__dirname + "/views/contact-page.html")
});

const port = 3000
app.listen(port, () => {console.log(`server now listening on port ${port}: http://localhost:${port}/`)});

// localhost:3000/about