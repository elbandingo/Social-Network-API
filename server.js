//require the dependencies mongoose and express
const express = require("express");
const mongoose = require("mongoose");
//declare app as express
const app = express();
//assign the port
const PORT = process.env.PORT || 3001;

//add in the middleware requirements for json, and routes
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(require('./routes'));

//connect the mongoose DB
mongoose.connect('mongodb://127.0.0.1:27017/Social-Network-API', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=> {
    if(err) throw err
    console.log('connected to the database');
});



//log mongo requests and queries that being run/executed
mongoose.set('debug', true);

//start the server and listen on port
app.listen(PORT, () => {
    console.log(`connected on port: ${PORT}`);
})