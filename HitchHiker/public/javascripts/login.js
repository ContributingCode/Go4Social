/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 6/27/12
 * Time: 12:03 PM
 * To change this template use File | Settings | File Templates.
 */


//
//var HH = {"url":"http://localhost:3000",
//            "appid":"",
//            "socket" : io.connect(),
//            "location":""
//          };
var HH = {"url":"http://hitchhiker.cloudfoundry.com",
    "appid":"",
    "socket" : io.connect(),
    "location":""
};

$("#page-login").bind('pageshow', function() {
    $('#btnLogin').attr("disabled","disabled");
});

    $("#page-login").bind('pagebeforeshow', function() {
    //fb authorization
    // Load the SDK Asynchronously
    (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    // Init the SDK upon load
    window.fbAsyncInit = function() {
        FB.init({
            appId   :       '262045627239392',
           // appId      : '457940300897313', // App ID
            channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
            status     : true, // check login status
            cookie     : true, // enable cookies to allow the server to access the session
            xfbml      : true  // parse XFBML
        });

        // listen for and handle auth.statusChange events
        FB.Event.subscribe('auth.statusChange', function(response) {
            if (response.authResponse) {
                // user has auth'd your app and is logged into Facebook
                login = true;
                FB.api('/me', function(me){
                    if (me) {
                        localStorage.setItem('appid',me.id);
                        HH.appid=me.id;
                        storeuserdetails(me);
                        watchlocation();
                    }
                });

            } else {
                alert('Authentication failed');
            }
        });

        $("#btnLogin").off('click').on('click',function logMeIn()
            {
                top.location = 'https://graph.facebook.com/oauth/authorize?client_id=262045627239392&scope=publish_stream,email,user_location,user_work_history&redirect_uri='+HH.url+'/index.html#page-home';

            });
    }

    function storeuserdetails(details){
        $.post(HH.url+'/insertDetails', {"details":details}, function (data) {
        });
    }
    function onSuccess(position) {
       // alert('success');

        $.post(HH.url+'/updateLocation', {"appid":HH.appid, "location": position.coords.latitude+","+position.coords.longitude }, function (data) {
            HH.location = "got it";
            //$('#btnLogin').val('Login using facebook');
            $('#btnLogin').attr("disabled",false);
        });
    }
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    function watchlocation(){
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {enableHighAccuracy: true,maximumAge:5000,timeout: 30000 });

    }

});

