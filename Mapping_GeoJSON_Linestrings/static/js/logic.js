console.log('Is it working?!');

/*
 * Map GeoJSON LineStrings
 */

// Create a light map layer.
let lightMap = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
  }
);

// Create  dark map layer.
let darkMap = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
  }
);

// Create a base layer that holds both map layers.
let baseMaps = {
  Light: lightMap,
  Dark: darkMap,
};

// Create the map object with center, zoom level and default layer.
let Toronto = [44.0, -80.0];

let map = L.map('mapid', {
  center: Toronto,
  zoom: 2,
  layers: [lightMap],
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//  Access Toronto GeoJSON data from my GitHub
let torontoData =
  'https://raw.githubusercontent.com/mcarter-00/Mapping-Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json';

// Create a style for the lines (routes are in light yellow with a weight of 2).
let myStyle = {
  color: '#ffffa1',
  weight: 2,
};

// Grab GeoJSON data
d3.json(torontoData).then(function (data) {
  console.log(data);
  // Create GeoJSON layer with retrieved data
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        '<h2> Airline: ' +
          feature.properties.airline +
          '</h2> <hr> <h3> Destination: ' +
          feature.properties.dst +
          '</h3>'
      );
    },
  }).addTo(map);
});
