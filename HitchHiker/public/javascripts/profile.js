/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 7/28/12
 * Time: 3:19 PM
 * To change this template use File | Settings | File Templates.
 */



$("#page-profile").bind('pagebeforeshow',function(){

    var temp = new Array();
    var temp =   document.location.hash.split("?");
    var id = temp[1].substring(3);
    //var id = localStorage.getItem("fromID");

    $.post(HH.url + '/getUserInfo', {"appid":id}, function (userObj) {

        $('#profile_name').text(userObj.details.name);
        $('#email_ID').text(userObj.details.email);
        $('#mobile_Number').text(userObj.details.gender);
        $('#pic').attr("src","https://graph.facebook.com/"+ userObj.details.link.substring(24)+"/picture");
        $('#title_name').text(userObj.details.work[0].employer.name);
        $('#base-location').text(userObj.details.location.name);
    });
       // alert(id);
});
