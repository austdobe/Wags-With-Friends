/* eslint-disable no-undef */

// $("document").ready(function(){
const userZipCode = [];
$('.mapButton').on('click', function (event) {
  event.preventDefault();
  console.log('click');
  $('#map-view').modal('toggle');
  L.mapquest.key = 'G6APIiFZIl5icGBUOlrCc75BkKFBfWRX';
  console.log(L.mapquest.key);
  userZipCode.push($('#userInfoForMap').data('zipcode').toString());

  console.log(userZipCode);

  L.mapquest.geocoding().geocode(userZipCode, createMap);
});
// Creating map
function createMap (err, res) {
  console.log(typeof userZipCode + ' function zip');
  console.log(err);
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
