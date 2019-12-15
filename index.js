const express = require('express');
const app = express();
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient
const routes = require('./routes.js')
//const host = '127.0.0.1'
//const port = 80
const port = process.env.PORT || 7777;


const db_uri = 'mongodb+srv://Pratik:test123@todocluster-nhuna.mongodb.net/test?retryWrites=true&w=majority'

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

console.log("checking connection with mongodb");
mongoclient.connect(db_uri, (error, dbClient) => {
    if(error){
        console.log("The error is ",error)
        return;
    }
    console.log("connection succesful with mongodb");
    const mydatabase = dbClient.db("myTodoDb")
    routes(app, mydatabase)
        // app.listen(port, host, () => {
        //     console.log(`Your server is Up and running with https://${host}:${port}`);
        // })
        app.listen(port,()=>{ // heroku
            console.log(`Listening on ${port}`);
        })
    })

