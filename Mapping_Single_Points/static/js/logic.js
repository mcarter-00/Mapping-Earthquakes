// Add console.log to check to see if our code is working.
console.log('Is it working?!');

// Create the map object with a center and zoom level.
let LosAngeles = [34.0522, -118.2437];

let map = L.map('mapid').setView(LosAngeles, 14); // zoom level adjust to 14 from 4.

// An alternative to using the setView() method is to modify each attribute in the map object using the curly braces.
// This method is useful when we need to add multiple tile layers, or a background image of our map(s).
// let map = L.map('mapid', {
//   center: [40.7, -94.5],
//   zoom: 4,
// });

// Create the tile layer that will be the background of our map (streets-v11).
let streets = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
  }
);

// Create the title layer... (dark-v10).
let darkMap = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
  }
);

// Add the tile layers to the map.
streets.addTo(map);
darkMap.addTo(map);

//  Add a marker to the map for Los Angeles, California.
var marker = L.marker(LosAngeles).addTo(map);

//  Add a circle to the map for Los Angeles, California.
// var cicle = L.circle(LosAngeles, {
//   color: 'black',
//   fillColor: 'ffffa1',
//   fillOpacity: 0.5,
//   radius: 300,
// }).addTo(map);

// Alternatively, we can create a circle using the circleMarker() function.
// The circleMarker() function measures the radius of the circle in pixels, with the default radius set at 10 pixels.
var circleMarker = L.circleMarker(LosAngeles, {
  radius: 300,
  color: 'black',
  fillColor: '#ffffa1',
}).addTo(map);
