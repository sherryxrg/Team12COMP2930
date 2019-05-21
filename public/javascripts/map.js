let LOCATION = false;

$(document).ready(function() {
  var map = L.map('mapid');

  map.locate({
    setView: true,
    maxZoom: 16,
    maximumAge: 60000,
    enableHighAccuracy: true,
    timeout: 100000000,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  $(document).on('click', '.select', function() {
    $('#lot-input').val($(this).attr('id'));
    $('#hourly').text($(this).siblings('.hourly').find('span').text());
    $('#daily').text($(this).siblings('.daily').find('span').text());
  });

  $(document).on('change', '#parking-time', function() {
    let timing = $('#time-type').val();
    let rate = $(`#${timing}`).text();
    if (timing == 'daily') {
      rate = 1;
    }
    let total = $(this).val() * rate;
    $('#total-due').val(total);
  });

  $(document).on('click', '#find_lot', function() {
    if (LOCATION) {
      let l = LOCATION;
      let m;
      let delta = 100000;
      let delta2 = 0;
      map.eachLayer((layer) => {
        if (layer._latlng && layer._latlng != LOCATION) {
          let ll = layer._latlng;
          console.log(ll);
          let x = Math.abs(ll.lat - LOCATION.lat);
          let y = Math.abs(ll.lng - LOCATION.lng);
          delta2 = Math.sqrt(x*x + y*y);
          if (delta2 < delta) {
            delta = delta2;
            l = ll;
            m = layer;
          }
        }
      });
      map.flyTo(l, 15);
      $.get(`/lots/find?lat=${l.lat}&long=${l.lng}`, (data) => {
        let lot = data;
        console.log(lot);
        m.bindPopup(`<h5>Closest Lot</h5>` +
          `<p>${lot.name}</p>` +
          `<p>Lot#${lot.number}</p>` +
          `<p>${lot.company.name}</p>` +
          `<p class="daily">Daily: $<span>${lot.rates.daily}</span></p>` +
          `<p class="hourly">Hourly: $<span>${lot.rates.hourly}</span></p>`)
        .openPopup();
        $('#lot-input').val(lot.number);
        $('#hourly').text(lot.rates.hourly);
        $('#daily').text(lot.rates.daily);
      });
    }
  });

  function onLocationFound(e) {
    var radius = e.accuracy / 2;

    LOCATION = e.latlng;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are here").openPopup();

    L.circle(e.latlng, radius).addTo(map);

    $.get('/lots/getAll', (data) => {
      let lots = data.lots;
      if (lots) {
        for (let i = 0; i < lots.length; i++) {
          L.marker([lots[i].lat, lots[i].long]).addTo(map)
            .bindPopup(`<h5>${lots[i].name}</h5>` +
              `<p>Lot#${lots[i].number}</p>` +
              `<p>${lots[i].company.name}</p>` +
              `<p class="daily">Daily: $<span>${lots[i].daily}</span></p>` +
              `<p class="hourly">Hourly: $<span>${lots[i].hourly}</span></p>` +
              `<button class="select" id="${lots[i].number}">Select</button>`);
        }
      }
    });

  }

  map.on('locationfound', onLocationFound);

  function onLocationError(e) {
      alert(e.message);
  }

  map.on('locationerror', onLocationError);
});
