/* eslint-disable no-undef */
<<<<<<< HEAD

$('.map').on('click', function (event) {
  event.preventDefault();
  $('#map-view').modal('toggle');
  L.mapquest.key = 'wAmctCflz6wnnwp1Bpyu2XWtFZ1XSvPS';
  const userZipCode = $('#userInfoForMap').data('zipcode');
  console.log(userZipCode);
  L.mapquest.geocoding().geocode([userZipCode], createMap);

  // Creating map
  function createMap (err, res) {
    if (err) throw err;
    const map = L.mapquest.map('map', {
      layers: L.mapquest.tileLayer('map'),
      center: [0, 0],
      zoom: 12
=======
// $("document").ready(function(){
    $('.map').on('click', function (event) {
    event.preventDefault();
    console.log("click");
    $('#map-view').modal('toggle');
    L.mapquest.key ='G6APIiFZIl5icGBUOlrCc75BkKFBfWRX';
    console.log(L.mapquest.key);
    const userZipCode = $('#userInfoForMap').data('zipcode').toString();
    console.log(userZipCode);
    L.mapquest.geocoding().geocode([userZipCode], createMap);
    // Creating map
    function createMap (err, res) {
        console.log(userZipCode +" function zip");
        if (err) throw err;
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
>>>>>>> 0a9672f64447f1821bee833250d7b55a081a7eac
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
  
