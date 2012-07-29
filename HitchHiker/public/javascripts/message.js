/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 7/27/12
 * Time: 10:26 PM
 * To change this template use File | Settings | File Templates.
 */




$("#page-message").bind('pagebeforeshow', function () {
    $('#btnSend').off('click').on('click', function () {
        $.post(HH.url + '/saveMessage', {"appid":localStorage.getItem("appid"),"phone":$('#phone').val(),"message":$('#message').val()}, function (data) {
            notify("hi");
            location.replace("index.html#page-home");
        });

    });
    function notify(data) {
       // alert('emiting');
        HH.socket.emit('notify', localStorage.getItem("appid"));
    }




});

