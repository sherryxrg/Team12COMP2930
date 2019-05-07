var map = L.map('mapid');

map.locate({setView: true, maxZoom: 16});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
      .bindPopup("You are here").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);
