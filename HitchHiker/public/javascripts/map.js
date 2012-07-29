/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 7/28/12
 * Time: 6:55 PM
 * To change this template use File | Settings | File Templates.
 */


$("#page-map").bind('pagebeforeshow', function () {
    demo.add(function() {
        coordinates = '37.409369,-122.147284';

        $('#map_canvas').gmap({'center': coordinates, 'zoom': 12, 'disableDefaultUI':false, 'callback': function() {
            var self = this;

            $.post(HH.url + '/getnearbyUsersData', {"appid":localStorage.getItem("appid")}, function (users) {
                for(var i=0;i<users.length;i++){
                    var coordiantes = users[i].location.LAT +"," +users[i].location.LONG;
                    var names = users[i].details.name;
                    self.addMarker({'position': coordiantes,'icon':'images/pin_purple.png' }).click(function() {
                        self.openInfoWindow({ 'content': names }, this);
                    });
                }
            });
        }});
    }).load();
});