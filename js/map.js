$(function() {

    var ios = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || $(window).width()<980;

    //map///////////////////////////////////////////////////////////////////////////////////////////////////
    function initialize(obj) {
        var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
        var contentString = $('#'+obj).attr("data-string");
        var myLatlng = new google.maps.LatLng(lat,lng);
        var map, marker, infowindow;
        var image = 'img/point.png';
        var zoomLevel = parseInt($('#'+obj).attr("data-zoom"));

        var styles = []

        var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

        var mapOptions = {
            zoom: zoomLevel,
            disableDefaultUI: true,
            scrollwheel:false,
            center: myLatlng

        };

        map = new google.maps.Map(document.getElementById(obj), mapOptions);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: image
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });

        google.maps.event.addDomListener(window, 'resize', function () {
            var center = map.getCenter();

            google.maps.event.trigger(map, 'resize');

            map.setCenter(center);
        });
    }

    if($('#contact-map').length==1){
        initialize('contact-map');
}



});

