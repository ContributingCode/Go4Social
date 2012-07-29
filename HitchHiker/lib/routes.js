//routes

var mongoLib = require('./mongoLib');
//var socketio = require('socket.io');

mongoLib.connect('mongodb-11');

module.exports = function routes(app) {

    app.get('/',function (req, res) {
        res.render("index.html");
    });
    app.post('/insertDetails',function (req, res) {
        mongoLib.insertDetails(req.body,function (err,data) {
            if (err) {
                console.log(err);
            }
            else {

                console.log(data);
                res.send(JSON.stringify(data));

            }
        });
    });
    app.post('/updateLocation',function (req, res) {
        mongoLib.updateLocation(req.body,function(err,data){
            if (err) {
                console.log(err);
            }
            else {

                res.send(JSON.stringify(data));

            }
        });
    });

    app.post('/saveMessage' ,function (req, res) {

        mongoLib.findcoordinates(req.body,function(err,data){
            if (err) {
                console.log(err);
            }
            else {
                console.log('server finding nearby users'+ new Date().toDateString());

                mongoLib.getNearbyUsers(data,function(err,userID){
                    if (err) {
                        console.log(err);
                    }else{
                        console.log("IDS are "+ userID);
                        var id=new Array();
                        for(var i=0; i<userID.length; i++) {
                            id=userID[i].id;
                            req.body.pic=data.details.link;
                            req.body.name=data.details.name;
                            req.body.ids=id.toString();
                            mongoLib.saveMessage(req.body,function(err,message){
                                if (err) {
                                    console.log(err);
                                }else{
                                    console.log(message);
                                    res.send(message);
                                }
                            });
                        }

                    }
                });
            }
        });
    });

    app.post('/getnearbyUsers',function (req, res) {
        mongoLib.findcoordinates(req.body,function(err,data){
            if (err) {
                console.log(err);
            }
            else {
                mongoLib.getNearbyUsers(data,function(err,data){
                    if (err) {
                        console.log(err);
                    }else{
                        console.log(data);

                    }});
            }
        });

    });
    app.post('/getnearbyUsersData',function (req, res) {
        mongoLib.findcoordinates(req.body,function(err,data){
            if (err) {
                console.log(err);
            }
            else {
                mongoLib.getNearbyCoordinates(data,function(err,data){
                    if (err) {
                        console.log(err);
                    }else{
                        console.log(data);
                        res.send(data);
                    }});
            }
        });

    });



    app.post('/getUsers',function (req, res) {
        mongoLib.findMessage(req.body.appid,function(err,messages){
            if(err){
            } else {
                res.send(messages);

            }
        });
    });

    app.post('/getUserInfo',function (req, res) {
        mongoLib.getUserInfo(req.body.appid,function(err,document){
            if(err){
            } else {
                res.send(document);

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
}