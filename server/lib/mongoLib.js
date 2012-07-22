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
        db.user_details.ensureIndex("location",callback);
        db.user_details.insert(data.details,function(err) {
                if(err) {
                    return console.log('insert error', err);
                }
            console.log("user details inserted successfully");
            callback("user details success");
            });
    },

    updateLocation: function(data,callback){
            db.collection('user_details');
            db.bind('user_details');

        db.user_details.update({"appid":data.appid},{$set:{"location":data.location}},function(err) {
                if(err) {
                    return console.log('insert error', err);
                }
            console.log("location update successfully");
            callback("location update success");
            });

        },
    getusers: function(data,callback){
        db.collection('user_details');
        db.bind('user_details');

        db.user_details.find({"appid":data.appid},{$set:{"location":data.location}},function(err) {
            if(err) {
                return console.log('insert error', err);
            }
            console.log("location update successfully");
            callback("location update success");
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
    if(data.value=="geolocation"){
        db.collection('user_details');
        db.bind('user_details');
        db.user_details.remove({},function(err, cursor) {
            if(err) {
                return console.log('login details error:', err);
            }
            else {
                cursor.toArray(callback);
            }
        });
    }

}


}