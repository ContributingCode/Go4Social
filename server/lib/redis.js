/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 7/19/12
 * Time: 10:47 PM
 * To change this template use File | Settings | File Templates.
 */


//var redis = require("redis"),
 //   client = redis.createClient();


module.exports = function(app){


    client.set("foo_rand000000000000", "hey from redis");


    client.get("foo_rand000000000000", function (err, reply) {
        console.log(reply.toString()); // Will print `OK`
    });



}
