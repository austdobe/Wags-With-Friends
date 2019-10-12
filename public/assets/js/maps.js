var displayMap = function(){
    L.mapquest.key =process.env.mapquest_key;

    L.mapquest.geocoding().geocode(['27511', '27513', '27519', '27560', '27607'], createMap);

    // Creating map
    function createMap(err, res) {
        var map = L.mapquest.map('map', {
        layers: L.mapquest.tileLayer('map'),
        center: [0, 0],
        zoom: 12
        }); 
    var featureGroup = generateMarkersFeatureGroup(res);
    // Add markers to the map and zoom to the features
    featureGroup.addTo(map);
    map.fitBounds(featureGroup.getBounds());
    }

    function generateMarkersFeatureGroup(res) {
        var group = [];
        for (var i = 0; i < res.results.length; i++) {
            var location = res.results[i].locations[0];
            var locationLatLng = location.latLng;
            var marker = L.marker(locationLatLng, {icon: L.mapquest.icons.flag()})
            .bindPopup(location.adminArea5 + ', ' + location.adminArea3);
            group.push(marker);
        }
        return L.featureGroup(group);
    }
};

module.exports = displayMap;