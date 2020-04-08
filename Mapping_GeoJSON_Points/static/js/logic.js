console.log('Is it working?!');

/*
 * Map a GeoJSON Point
 */

// Create the map object with center at the San Francisco airport and zoom level of 10.
let SFOcenter = [37.622044, -122.37887];
let map = L.map('mapid').setView(SFOcenter, 10);
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

// Add GeoJSON data.
let sanFranAirport = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: '3469',
        name: 'San Francisco International Airport',
        city: 'San Francisco',
        country: 'United States',
        faa: 'SFO',
        icao: 'KSFO',
        alt: '13',
        'tz-offset': '-8',
        dst: 'A',
        tz: 'America/Los_Angeles',
      },
      geometry: {
        type: 'Point',
        // Per documentation, GeoJSON data coordinates are set with the first parameter as X (longitude)
        // and the second parameter as Y (latitude).
        // L.geoJSON() layer reverses the coordinates to plot them on the map.
        coordinates: [-122.375, 37.61899948120117],
      },
    },
  ],
};

/*
! This uses pointToLayer call back function
*/
// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function (feature, latlng) {
//     console.log(feature);
//     // Bind a popup to the marker
//     return L.marker(latlng).bindPopup(
//       '<h2>' +
//         feature.properties.name +
//         '</h2> <hr> <h3>' +
//         feature.properties.city +
//         ', ' +
//         feature.properties.country +
//         '</h3>'
//     );
//   },
// }).addTo(map);

/*
! This uses onEachFeature call back function
*/
// Grabbing our GeoJSON data.
L.geoJson(sanFranAirport, {
  onEachFeature: function (feature, layer) {
    console.log(layer);
    layer.bindPopup(
      '<h2> Airport Code: ' +
        feature.properties.faa +
        '</h2> <hr> <h3> Airport Name: ' +
        feature.properties.name +
        '</h3>'
    );
  },
}).addTo(map);
