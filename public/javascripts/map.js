var map = L.map('mapid');

map.locate({setView: true, maxZoom: 16});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.get('/lots/getAll', (data) => {
  let lots = data.lots;
  if (lots) {
    for (let i = 0; i < lots.length; i++) {
      L.marker([lots[i].lat, lots[i].long]).addTo(map)
        .bindPopup(`<h4>${lots[i].name}</h4>` +
          `<p>Lot#${lots[i].number}</p>` +
          `<p>${lots[i].company.name}</p>`);
    }
  }
});

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
