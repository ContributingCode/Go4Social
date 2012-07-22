$("#page-home").bind('pageinit', function() {
        
    $("#user_name").text("Jinchao Ye");
    $("#user_image").attr("src","http://profile.ak.fbcdn.net/hprofile-ak-ash2/372183_100002081796756_1036753949_q.jpg");
    $("#user_location").text("Stanford, California");
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

