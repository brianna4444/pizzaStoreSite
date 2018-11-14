let express = require('express');
let app = express();
let port = 3000;
let fs = require('fs');
let mongo = require("mongodb").MongoClient;
let mongodb = require("mongodb");


app.listen(port, function () {
    console.log("server is working")
});

mongo.connect("mongodb://localhost:27017", function (err, client) {
    if (err) {
        console.log("cant connect to server");
        return;
    }

    let db = client.db("pizzaStore");


    app.get('/list', function (req, res) {
        let collName = req.query.collection;
        let coll = db.collection(collName);
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    });


    app.get('/search', function (req, res) {
        let category= req.query.category;
        let item = req.query.item;
        let obj={
            name: item
        }
        let coll= db.collection(category);
        coll.find(obj).toArray(function (err, result) {
            res.send(result);
        });

    });

    app.get('/order', function (req, res) {
        let coll= db.collection("orderHistory");
        let item= req.query.items;
        let time= req.query.time;
        let total= req.query.total;
        let obj= {
            items: item,
            total: total,
            time: time,

        }
        coll.insert(obj);
        res.send("Order Received!");
    })

})

