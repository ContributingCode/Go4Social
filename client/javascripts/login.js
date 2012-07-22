/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 6/27/12
 * Time: 12:03 PM
 * To change this template use File | Settings | File Templates.
 */


$("#page-login").bind('pageinit', function() {

    $('page-message').dialog('close')
    url="http://givemearide.cloudfoundry.com";

    function onSuccess(position) {
        var  details = {"appid":i,"location": position.coords.longitude+","+position.coords.latitude,"name":"prk"};
        $.post(url+'/insertDetails', {"details":details}, function (data) {
        });
        $.post(url+'/updateLocation', {"appid":"1", "location": position.coords.latitude+","+position.coords.longitude }, function (data) {
        });
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude::: '  + position.coords.latitude      + '<br />' +
            'Longitude::: ' + position.coords.longitude     + '<br />' +
            '<hr />'      + element.innerHTML;
        i++;
    }
    function onError(error) {
        //alert('code: '    + error.code    + '\n' +
          //  'message: ' + error.message + '\n');
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {enableHighAccuracy: true,maximumAge:5000,timeout: 30000 });

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
            appId      : '457940300897313', // App ID
            channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
            status     : true, // check login status
            cookie     : true, // enable cookies to allow the server to access the session
            xfbml      : true  // parse XFBML
        });

        // listen for and handle auth.statusChange events
        FB.Event.subscribe('auth.statusChange', function(response) {
            if (response.authResponse) {
                // user has auth'd your app and is logged into Facebook
                FB.api('/me', function(me){
                    loggedin_user = me;
                    /*
                    if (me.name) {
                        //$('#txtUser').text = me.name;
                        document.getElementById('auth-displayname').innerHTML = me.name;
                    }
                    if (me.id) {
                        document.getElementById('auth-displayid').innerHTML = me.id;
                    }
                    if (me.link) {
                        document.getElementById('auth-picture').innerHTML = '<img src="https://graph.facebook.com/'+me.link.substring(24)+'/picture"/>';
                    }
                    if (me.gender){
                        document.getElementById('auth-gender').innerHTML = me.gender;
                    }
                    if (me.email){
                        document.getElementById('auth-email').innerHTML = me.email;
                    }
                    if (me.location){
                        document.getElementById('auth-location').innerHTML = me.location.name;
                    }
                    if (me.work_history){
                        document.getElementById('auth-work_history').innerHTML = me.work_history[0];
                    }
                    */
                });
                document.getElementById('auth-loginlink').style.display = 'none';
                document.getElementById('auth-loggedin').style.display = 'block';
            } else {
                // user has not auth'd your app, or is not logged into Facebook
                document.getElementById('auth-loginlink').style.display = 'block';
                document.getElementById('auth-loggedin').style.display = 'none';

            }
        });


        $("#auth-loginlink").off('click').on('click',function () {
            FB.login(function(response) {
                // handle the response
            }, {scope: 'email,user_location,user_work_history'});
        });
        document.getElementById('auth-logoutlink').addEventListener('click', function(){
          FB.logout();
        }); 
    }

});

