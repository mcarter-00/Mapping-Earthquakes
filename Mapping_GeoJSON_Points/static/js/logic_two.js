console.log('Is it working?!');

/*
 * Map Multiple GeoJSON Points
 */

// Create the map object with the geographical center of the Earth and set the zoom level of 2.
let earthCenter = [30, 30];
let map = L.map('mapid').setView(earthCenter, 2);
let streets = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
  }
);

streets.addTo(map);

// Access GeoJSON airport data from my GitHub
let airportData =
  'https://raw.githubusercontent.com/mcarter-00/Mapping-Earthquakes/Mapping_GeoJSON_Points/majorAirports.json';

// Grab GeoJSON data
d3.json(airportData).then(function (data) {
  console.log(data);
  // Create GeoJSON layer with retrieved data
  L.geoJson(data, {
    onEachFeature: function (feature, layer) {
      // Add a popup marker that displays all airports’ codes and names
      layer.bindPopup(
        '<h2> Airport Code: ' +
          feature.properties.faa +
          '</h2> <hr> <h3> Airport Name: ' +
          feature.properties.name +
          '</h3>'
      );
    },
  }).addTo(map);
});
