var express = require('express');
//var ejs = require('ejs');

exports.configure = function(app) {
    app.configure(function() {
//        app.use(express.cookieParser());
//        if (process.env.stickySession && process.env.stickySession == "ON") {
//            app.use(express.session({
//                secret: 'your secret here',
//                key: 'jsessionid'
//            }));
//        }
//        else {
//            app.use(express.session({
//                secret: 'your secret here'
//            }));
//        }

       
//        app.set('views', __dirname + '/../views');
//        app.set('view engine', 'ejs');
//        app.set('view options', {
//            layout: false
//        });

      app.use(express.static('/Users/prasannasr/Documents/node.js/VCommute/Project X/client'));
        app.use(express.bodyParser());
    });

    app.configure('development',
    function() {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    app.configure('production',
    function() {
        app.use(express.errorHandler());
    });
}