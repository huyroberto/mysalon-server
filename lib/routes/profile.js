module.exports = (function () {
    'use strict';
    var express = require('express');
    var sync = require('synchronize');


    var router = express.Router();
    //Get thong tin profile
    router.get('/', function (req, res) {
        //backendService.checkConnection();
        res.json({ message: 'Welcome to  MySalon API Gateway - Profile!' });
    });

    
    return router;
})();