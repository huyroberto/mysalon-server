module.exports = (function () {
    'use strict';
    var express = require('express');
    var sync = require('synchronize');
    var mongodb = require('mongodb');
    var db_conn_string = 'mongodb://192.168.99.100:32768/mysalon';
    var MongoClient = mongodb.MongoClient;

    var router = express.Router();
    //Get thong tin profile
    router.get('/', function (req, res) {
        //backendService.checkConnection();
        res.json({ message: 'Welcome to  MySalon API Gateway - Business!' });
    });

    router.post('/menu/add', function (req, res) {
        var collection_name = 'business_menu';
        var user_id = req.body.user_id;
        var menu_item = { user_id: user_id, service: req.body.service, price: req.body.price, time: req.body.time };
        try {
            // Use connect method to connect to the Server
            MongoClient.connect(db_conn_string, function (err, db) {
                if (err) {
                    console.log('Unable to connect to the mongoDB server. Error:', err);
                    res.json({ code: 1, message: err });
                } else {
                    //HURRAY!! We are connected. :)
                    console.log('Connection established to', db_conn_string);
                    var collection = db.collection(collection_name);

                    // Insert some users
                    collection.insert(menu_item, function (err, result) {
                        if (err) {
                            res.json({ code: 1, message: err });
                            console.log(err);
                        } else {
                            console.log('Inserted %d documents into the ', collection_name, ' collection. The documents inserted with "_id" are:', result.length, result.insertedIds);
                        }

                        //Close connection
                        db.close();
                    }
                    );
                }
            })
            res.json({ code: 0, message: 'Success' });
        }
        catch (err) {
            res.json({ code: 1, message: err });
        }
    });
    //List danh sach menu of business
    router.post('/menu/list', function (req, res) {
        var user_id = req.body.user_id;
        var collection_name = 'business_menu';
        // Use connect method to connect to the Server
        MongoClient.connect(db_conn_string, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                res.json({ code: 1, message: err });
            } else {
                //HURRAY!! We are connected. :)
                console.log('Connection established to', db_conn_string);

                var collection = db.collection(collection_name);

                // Insert some users
                collection.find({ user_id: user_id }).toArray(function (err, result) {
                    if (err) {
                        res.json({ code: 1, message: err });
                        console.log(err);
                    } else if (result.length) {
                        console.log('Found:', result);
                        res.json({ code: 0, message: 'Success', data: result });
                    } else {
                        console.log('No document(s) found with defined "find" criteria!');
                        res.json({ code: 0, message: 'Success', data: null });
                    }
                    //Close connection
                    db.close();
                });
            }
        })

    });

    router.post('/service/list', function (req, res) {
        var list_service = [
            { code: 'hairdresser', name: 'Hairdresser' },
            { code: 'nailist', name: 'Nailist' },
            { code: 'barber', name: 'Barber' },
            { code: 'beaticial', name: 'Beautician' },
            { code: 'eye', name: 'Eye lashes' }
        ];
        res.json({ code: 0, message: 'Success', data: list_service });
    });
    return router;
})();