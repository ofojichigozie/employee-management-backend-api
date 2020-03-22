const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes section
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

//Connect to MongoDB
try{
    mongoose.connect('mongodb+srv://Chigozie:gozlite12345@mongocluster-ujn9i.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}, () => {
        console.log('Connected to MongoDB database');
    });
}catch(e){
    console.log(e.message);
}

//Start the server application
const PORT = process.env.PORT || 5000;
app.listen(PORT);
