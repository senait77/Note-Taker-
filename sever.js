var express = require('express');

// invoke the app that it is using the express server
var app = express();

// set the initial PORT that the note taker app will be using
var PORT = process.env.PORT || 8080;

// here are the midleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// here are the routes used for the app
//require("./routes/apiRoute")(app);
//require("./routes/htmlRoute")(app);

// let the app listen to what ever the PORT is.

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
})