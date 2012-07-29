var dbUtil = require('./cloudFoundryUtil');

var conn;
var db;
module.exports = {
    connect: function(dbServiceName) {
        db = dbUtil.connect('mongodb', dbServiceName,
            function(err, connection) {
                if (err || !connection) {
                    console.log('Could not connect to MongoDB');
                } else {
                    console.log('Connected to MongoDB successfully');
                    conn = connection;
                }
            });
    },
    insertDetails: function(data,callback){
        db.collection('user_details');
        db.bind('user_details');
        var details = {"id":data.details.id,"location":[0,0],"details":data.details,"timestamp":new Date().toString()};
        db.user_details.find({"id":data.details.id},function(err, cursor) {
            if(err) {
                return console.log('login details error:', err);
            }  else{
                cursor.count(function(err, count){
                    if(count<1){
                        db.user_details.insert(details,function(err) {
                            if(err) {
                                return console.log('insert error', err);
                            } else{
                                console.log("user details inserted successfully");
                                db.user_details.ensureIndex({"location":"2d"});
                                callback(null,"user details success");
                            }

                        });
                    }
                });
                callback(null,"User already exists");

            }

        });
    },
    updateLocation: function(data,callback){
        var temp = new Array();
        db.collection('user_details');
        db.bind('user_details');

        temp= data.location.split(",");
        data.location = parseFloat(temp[0]) ;
        db.user_details.update({"id":data.appid},{$set:{"location":{"LAT":parseFloat(temp[0]),"LONG":parseFloat(temp[1])},"timestamp":new Date().toString()}},function(err) {
            if(err) {
                return console.log('insert error', err);
            }
            console.log("location update successfully");
            callback(null,"location update success");
        });

    },
    findcoordinates : function(data,callback){
        db.collection('user_details');
        db.bind('user_details');
        db.user_details.findOne({"id":data.appid},function(err, document) {
            if(err) {
                return console.log('find coordinates error:', err);
            }else{
                callback(null,document);
            }
        });
    },
    saveMessage : function(data,callback){
        var info = data.phone +","+data.message;
        db.collection('user_messages');
        db.bind('user_messages');
        db.user_messages.insert({"name":data.name,"pic":data.pic,"fromID":data.appid,"info":info,"toID":data.ids,"timestamp":new Date().toString()},function(err,cursor) {
            if(err) {
                return console.log('insert error', err);
            }  else {
                callback(null,"message save successfull !");
            }
        });
    },
    findMessage : function(appid,callback){
        db.collection('user_messages');
        db.bind('user_messages');
        db.user_messages.find({"toID":appid},{},{sort:['_id','-1']},function(err, cursor) {
            if(err) {
                return console.log('login details error:', err);
            } else{
                cursor.limit(10);
                cursor.toArray(callback);
            }
        });
    },
    getNearbyUsers: function(data,callback){
        db.collection('user_details');
        db.bind('user_details');
        db.user_details.find({location:{"$within" : {"$center" : [{"LAT":parseFloat(data.location.LAT),"LONG":parseFloat(data.location.LONG)},0.03]}}},{"id":true},function(err,cursor) {
            //db.user_details.find({location:{$near:[37,-122]}},function(err,cursor) {
            if(err) {
                return console.log('insert error', err);
            }
            console.log("location update successfully");
            cursor.toArray(callback);
        });
    },
    getNearbyCoordinates: function(data,callback){
        db.collection('user_details');
        db.bind('user_details');
        db.user_details.find({location:{"$within" : {"$center" : [{"LAT":parseFloat(data.location.LAT),"LONG":parseFloat(data.location.LONG)},0.03]}}},function(err,cursor) {
            //db.user_details.find({location:{$near:[37,-122]}},function(err,cursor) {
            if(err) {
                return console.log('insert error', err);
            }
            console.log("location update successfully");
            cursor.toArray(callback);
        });
    },


    getUserInfo : function(appid,callback){
        db.user_details.findOne({"id":appid},function(err, document) {
            if(err) {
                return console.log('login details error:', err);
            } else{
                callback(null,document);
            }
        });
    },
    viewData: function(data,callback){
        if(data.value=="geolocation"){
            db.collection('user_details');
            db.bind('user_details');
            db.user_details.find({},function(err, cursor) {
                if(err) {
                    return console.log('login details error:', err);
                }
                cursor.toArray(callback);
            });
        }

    },

    deleteData: function(data,callback){
        if(data.value=="msg"){
            db.collection('user_messages');
            db.bind('user_messages');
            db.user_messages.remove({},function(err, cursor) {
                if(err) {
                    return console.log('login details error:', err);
                }   else{
                    callback(null,"success");
                }

            });
        }

    }


}