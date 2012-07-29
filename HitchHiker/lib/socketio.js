/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 7/18/12
 * Time: 11:16 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoLib = require('./mongoLib');
//var socketio = require('socket.io');

mongoLib.connect('mongodb-11');
var socketio = require('socket.io');

module.exports = function (app) {
    io = socketio.listen(app);
    io.configure(function() {
        io.set('log level', 1);
        io.set("transports", ["xhr-polling"]);
    });
    io.sockets.on('connection', function (socket) {
        console.log('connection established!~1');
        socket.on('notify',function(appid){
            console.log('got socket ...server finding messages'+ new Date().toDateString());
            mongoLib.findMessage(appid,function(err,messages){
                if(err){
                } else {
                    console.log("server emiting sockets");
                    io.sockets.emit('update', {"message": messages });

                }
            });
        });
    });
}
