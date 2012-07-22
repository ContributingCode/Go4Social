/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 7/18/12
 * Time: 11:16 AM
 * To change this template use File | Settings | File Templates.
 */


var socketio = require('socket.io');

module.exports = function (app) {
    io = socketio.listen(app);
//    io.configure(function() {
//        io.set('log level', 1);
//        io.set("transports", ["xhr-polling"]);
//    });

    io.sockets.on('connection', function (socket) {
        console.log('connection established');
        socket.on('notify',function(data){
            console.log('-----update-------');
            io.sockets.emit('update', { email: data });
        });
    });
}
