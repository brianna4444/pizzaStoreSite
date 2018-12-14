let express = require('express');
let app = express();
let port = 3000;
let fs = require('fs');
let mongo = require("mongodb").MongoClient;
let mongodb = require("mongodb");
let cors= require("cors");

app.use(cors());


app.listen(port, function () {
    console.log("server is working")
});

mongo.connect("mongodb://localhost:27017", function (err, client) {
    if (err) {
        console.log("cant connect to server");
        return;
    }

    let db = client.db("pizzaStore");

    app.get('/count', function (req, res) {
        let collName = req.query.collection;
        let coll = db.collection(collName);
        coll.find({}).count(function (err, result){
            res.send(result.toString());
        })
    });

    app.get('/countSearch', function (req, res){
        let collName = req.query.collection;
        let coll = db.collection(collName);
        let name= req.query.item;
        let obj={
            name: new RegExp(name, 'ig')
        }

        coll.find(obj).count(function (err, result) {
            res.send(result.toString());
        })
    });


    app.get('/list', function (req, res) {
        let collName = req.query.collection;
        let coll = db.collection(collName);
        let pageNumber = req.query.page;
        let limit = 6;
        let skip = (pageNumber-1) * 6;
        coll.find({}).skip(skip).limit(limit).toArray(function (err, result) {
            res.send(result);
        })
    });

    app.get('/listSearch', function (req, res) {
        let collName = req.query.collection;
        let coll = db.collection(collName);
        let pageNumber = req.query.page;
        let name= req.query.item;
        let obj={
            name: new RegExp(name, 'ig')
        }
        let limit = 6;
        let skip = (pageNumber-1) * 6;
        coll.find(obj).skip(skip).limit(limit).toArray(function (err, result) {
            res.send(result);
        })
    });


    app.get('/search', function (req, res) {
        let collName= req.query.collection;
        let item = req.query.item;
        let obj={
            name: item
        }
        let coll= db.collection(collName);
        coll.find(obj).toArray(function (err, result) {
            res.send(result);
        });

    });

    app.get('/order', function (req, res) {
        let coll= db.collection("orderHistory");
        let items= req.query.items;
        let total= req.query.total;
        let name= req.query.name;
        let number= req.query.number;
        let address= req.query.address;
        let obj= {
            name: name,
            number: number,
            address: address,
            items: items,
            total: total,
            time: + Date.now(),

        }
        coll.insert(obj);
        res.send("Order Received!");
    })

})

