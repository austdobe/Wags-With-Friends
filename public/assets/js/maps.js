// import { get } from "http";

// import { userInfo } from "os";
var maps = function(){
$('.map').on('click', function (event) {
    event.preventDefault();
    $('#map-view').modal('toggle');
    L.mapquest.key = "wAmctCflz6wnnwp1Bpyu2XWtFZ1XSvPS";
    var userZipCode = $('.map').attr(userInfo.zipcode);
    console.log(userZipCode);
    L.mapquest.geocoding().geocode([userZip, friendZip], createMap);

    // Creating map
    function createMap (err, res) {
        const map = L.mapquest.map('map', {
        layers: L.mapquest.tileLayer('map'),
        center: [0, 0],
        zoom: 12
        }); 
        const featureGroup = generateMarkers(res);
        // Add markers to the map and zoom to the features
        featureGroup.addTo(map);
        map.fitBounds(featureGroup.getBounds());
    }

    function generateMarkers (res) {
        const group = [];
        for (let i = 0; i < res.results.length; i++) {
        const location = res.results[i].locations[0];
        const locationLatLng = location.latLng;
        const marker = L.marker(locationLatLng, { icon: L.mapquest.icons.flag() })
            .bindPopup(location.adminArea5 + ', ' + location.adminArea3);
        group.push(marker);
        }
        return L.featureGroup(group);
    }


});
};