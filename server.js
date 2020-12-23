// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 8080;
// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Start Help Methods
const serverIsRunningCallBack = () => {
    console.log(`Server is Running in port ${PORT}`)
}

/**
 * 
 * End Help Methods
 * Start Api Listeners 
 * 
 *  */
app.get("/getData", (req, res, next) => {
    res.statusCode = 200;
    res.json(projectData);
    next();
})


app.post("/", (req, res, next) => {
    const { temperature, date, user_response } = req.body;
    if (temperature && date && user_response) {
        projectData.temperature = temperature;
        projectData.date = date;
        projectData.user_response = user_response;
        res.statusCode = 200;
        res.statusMessage = "Added Success.";
    } else {
        res.statusCode = 400;
        res.statusMessage = "Body Does Not Match Required Data.";
    }
    res.json(projectData);
    next();
})
/**
 * 
 * End Api Listeners 
 * Setup Server
 * 
 *  */
app.listen(PORT, serverIsRunningCallBack)

