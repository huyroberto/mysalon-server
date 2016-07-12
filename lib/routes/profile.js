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
        res.json({ message: 'Welcome to  MySalon API Gateway - Profile!' });
    });

    router.post(
        '/update', function (req, res) {
            var user = {
                _id: req.body.email,
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                customer_type: req.body.customer_type,
                mobile: req.body.mobile,
                service: req.body.serviceservice
            }
            var collection_name = 'profile';

            // try {
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
                    collection.save(user, function (err, result) {
                        if (err) {
                            res.json({ code: 1, message: err });
                            console.log(err);
                        } else {
                            console.log('Inserted %d documents into the ', collection_name, ' collection. The documents inserted with "_id" are:', result);
                        }

                        //Close connection
                        db.close();
                    }
                    );
                }
            })
            res.json({ code: 0, message: 'Success' });
            // }
            // catch (err) {
            //     res.json({ code: 1, message: err });
            // }
        }
    );

    return router;
})();