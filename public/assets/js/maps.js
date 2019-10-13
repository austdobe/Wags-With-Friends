const displayMap = function () {
    L.mapquest.key = process.env.mapquest_key;

    L.mapquest.geocoding().geocode(['27511', '27513', '27519', '27560', '27607'], createMap);

    // Creating map
    function createMap (err, res) {
        const map = L.mapquest.map('map', {
        layers: L.mapquest.tileLayer('map'),
        center: [0, 0],
        zoom: 12
        }); 
        const markerGroup = generateMarkers(res);
        // Add markers to the map and zoom to the features
        markerGroup.addTo(map);
        map.fitBounds(markerGroup.getBounds());
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
        return L.markerGroup(group);
    }
};

module.exports = displayMap;
