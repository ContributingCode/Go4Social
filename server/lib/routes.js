//routes

var mongoLib = require('./mongoLib');
//var socketio = require('socket.io');

mongoLib.connect('mongodb-11');

module.exports = function routes(app) {


    app.post('/insertDetails',function (req, res) {
        mongoLib.insertDetails(req.body,function (err,data) {
            if (err) {
                console.log(err);
            }
            else {
                //todo remove this in production
                res.header('Access-Control-Allow-Origin', '*');
                res.send(data);
            }
        });
    });
    app.post('/updateLocation',function (req, res) {
           mongoLib.updateLocation(req.body,function(err,data){
               if (err) {
                   console.log(err);
               }
               else {
                   //todo remove this in production
                   res.header('Access-Control-Allow-Origin', '*');
                   res.send(data);
               }
           });
        });

    //for development purpose
    //  to view data in mongodb
    app.post('/viewdata',
        function (req, res) {
            mongoLib.viewData(req.body,function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.send(JSON.stringify(data));

                }
            });
        });
    app.post('/deletedata',
        function (req, res) {
            mongoLib.deleteData(req.body,function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.send(JSON.stringify(data));

                }
            });
        });

    function persistData(data) {
        mongoLib.persistUserprofiledata(data, function (err, json) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Data persisted successfully !');

            }
        });
    }
}