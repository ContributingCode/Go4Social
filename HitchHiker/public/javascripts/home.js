/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 7/21/12
 * Time: 9:45 PM
 * To change this template use File | Settings | File Templates.
 */



$("#page-home").bind('pagebeforeshow',function(){

    $.post(HH.url + '/getUsers', {"appid":localStorage.getItem("appid")}, function (data) {
        $("#userList li").remove();
        $("#userList").listview('refresh');
        var user = data;
        for(var i=user.length-1;i>=0;i--){
            var time = getTime(user[i]);
            $("#userList").append(generateList(user[i]));
        }
        $("#userList").listview('refresh');

        function getTime(user){
            var one_min = 1000 * 60;
            var current_time = new Date().getTime();
            var temp = new Date(user.timestamp);
            var minutes = (current_time - temp ) / one_min;
            if (minutes < 60) {
                time = Math.round(minutes) + " minutes ago";
            }
            if (minutes >= 60 && (minutes / 60) < 24) {
                time = Math.round(minutes / 60) + " hour(s) ago";
            }
            if (minutes / 60 > 24) {
                time = Math.round((minutes) / (60 * 24)) + " day(s) ago";
            }
            return time;
        }

        function generateList(user) {
            var info =    user.info.split(",");

            return '<li><a  href="index.html#page-profile?id='+ user.fromID +'" data-role="link"><img src="https://graph.facebook.com/'
                + user.pic.substring(24)+'/picture"/><h3>'
                +user.name+'</h3><p>I want a ride to <strong>'
                + info[1]+'</strong>,</p><p> contact me at <strong>'
                +info[0]+'</strong></p><p class="ui-li-aside"><strong>'
                +time+'</strong></p></a></li>';
        }

        $('#btnsendMessage').off('click').on('click', function() {
            location.replace("index.html#page-message");
        });

    });

    HH.socket.on('update', function (data) {
        var user = data.message;
        $("#userList li").remove();
        for(var i=user.length-1;i>=0;i--){
            var time = getTime(user[i]);
            $("#userList").append(generateList(user[i]));

        }

        $("#userList").listview('refresh');

        function getTime(user){
            var one_min = 1000 * 60;
            var current_time = new Date().getTime();
            var temp = new Date(user.timestamp);
            var minutes = (current_time - temp ) / one_min;
            if (minutes < 60) {
                time = Math.round(minutes) + " minutes ago";
            }
            if (minutes >= 60 && (minutes / 60) < 24) {
                time = Math.round(minutes / 60) + " hour(s) ago";
            }
            if (minutes / 60 > 24) {
                time = Math.round((minutes) / (60 * 24)) + " day(s) ago";
            }
            return time;
        }

        function generateList(user) {
            var info =    user.info.split(",");

            return '<li><a href="index.html#page-profile?id='+ user.fromID +'" data-rel="dialog" data-transition="pop"><img src="https://graph.facebook.com/'
                + user.pic.substring(24)+'/picture"/><h3>'
                +user.name+'</h3><p>I want a ride to <strong>'
                + info[1]+'</strong>,</p><p> contact me at <strong>'
                +info[0]+'</strong></p><p class="ui-li-aside"><strong>'
                +time+'</strong></p></a></li>';
        }
    });

});
