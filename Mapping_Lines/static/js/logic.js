// Add console.log to check to see if our code is working.
console.log('Is it working?!');

// Create the map object with a center and zoom level.
// let center = [40.7, -94.5];
// let LosAngeles = [34.0522, -118.2437];
// let centerCA = [36.1733, -120.1794];
let centerSF = [37.6213, -122.379];

let map = L.map('mapid').setView(centerSF, 5); // adjust zoom level 0-14 on average.

// An alternative to using the setView() method is to modify each attribute in the map object using the curly braces.
// This method is useful when we need to add multiple tile layers, or a background image of our map(s).
// let map = L.map('mapid', {
//   center: [40.7, -94.5],
//   zoom: 4,
// });

// Create the tile layer that will be the background of our map (streets-v11).
// let streets = L.tileLayer(
//   'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: apiKey,
//   }
// );

// Create the tile layer... (dark-v10).
// let darkMap = L.tileLayer(
//   'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: apiKey,
//   }
// );

// Create the tile layer... (satellite-streets-v11).
// let satellite = L.tileLayer(
//   'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: apiKey,
//   }
// );

// Create the tile layer... (light-v10).
let lightMap = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
  }
);

// Add the tile layers to the map.
// streets.addTo(map);
// darkMap.addTo(map);
// satellite.addTo(map);
lightMap.addTo(map);

/*
 * Add a single marker.
 */

//  Add a marker to the map for Los Angeles, California.
// var marker = L.marker(LosAngeles).addTo(map);

//  Add a circle to the map for Los Angeles, California.
// var cicle = L.circle(LosAngeles, {
//   color: 'black',
//   fillColor: 'ffffa1',
//   fillOpacity: 0.5,
//   radius: 300,
// }).addTo(map);

// Alternatively, we can create a circle using the circleMarker() function.
// The circleMarker() function measures the radius of the circle in pixels, with the default radius set at 10 pixels.
// var circleMarker = L.circleMarker(LosAngeles, {
//   radius: 300,
//   color: 'black',
//   fillColor: '#ffffa1',
// }).addTo(map);

/*
 * Add multiple markers.
 */

// Get data from cities.js.
let cityData = cities;

// Loop through the cities array and create one marker for each city.
var cityMarkers = cityData.forEach(function (city) {
  console.log(city);
  // Add a marker for each location... change from L.marker() to L.circleMarker()
  L.circleMarker(city.location, {
    // Radii are too large and don’t fit on the map.
    // Decrease each city’s radius by dividing population by the value “100000”
    radius: city.population / 200000,
    color: 'Orange',
    lineWeight: 4,
  })
    // Add .bindPopup() method to retrieve the name of the city, state, and population.
    .bindPopup(
      '<h2>' +
        city.city +
        ', ' +
        city.state +
        '</h2> <hr> <h3>Population: ' +
        // Format 'population' with a thousands separator by using the toLocaleString() method
        city.population.toLocaleString() +
        '</h3>'
    )
    .addTo(map);
});

/*
 * Mapping a Single Line
 */

// Coordinates for each point to be used in the line.
let LAXairport = [33.9416, -118.4085];
let SFOairport = [37.6213, -122.379];
let SLCairport = [40.7899, -111.9791];
let SEAairport = [47.4502, -122.3088];

let line = [LAXairport, SFOairport, SLCairport, SEAairport];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: 'yellow',
}).addTo(map);

// Skill Drill: Create an airline route from SFO to JFK) with two stops,
// Austin-Bergstrom International Airport (AUS) and Toronto Pearson International Airport (YYZ).
// Make the route a blue dashed line, with a weight of 4 and opacity of 0.5 on the light map.
let JFKairport = [40.642207, -73.778182];
let AUSairport = [30.19736, -97.666354];
let YYZairport = [43.677772, -79.624788];

let line2 = [SFOairport, AUSairport, YYZairport, JFKairport];

L.polyline(line2, {
  color: 'blue',
  weight: 3,
  opacity: 0.5,
}).addTo(map);
