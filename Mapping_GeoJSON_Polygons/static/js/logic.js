console.log('Is it working?!');

/*
 * Map GeoJSON LineStrings
 */

// Create a streets map layer.
let streets = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
  }
);

// Create a satelitte streets map layer.
let satelliteStreets = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
  }
);

// Create a base layer that holds both map layers.
let baseMaps = {
  Streets: streets,
  'Satellite Streets': satelliteStreets,
};

// Create the map object with center, zoom level and default layer.
let Toronto = [43.7, -79.3];

let map = L.map('mapid', {
  center: Toronto,
  zoom: 11,
  layers: [streets],
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//  Access Toronto GeoJSON data from my GitHub
let torontoHoods =
  'https://raw.githubusercontent.com/mcarter-00/Mapping-Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json';

// Create a style for the lines (routes are in light yellow with a weight of 2).
let myStyle = {
  color: 'blue',
  fillColor: 'yellow',
  weight: 1,
};

// Grab GeoJSON data
d3.json(torontoHoods).then(function (data) {
  console.log(data);
  // Create GeoJSON layer with retrieved data
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function (feature, layer) {
      console.log(layer);
      layer.bindPopup('<h2>' + feature.properties.AREA_NAME + '</h2>');
    },
  }).addTo(map);
});
