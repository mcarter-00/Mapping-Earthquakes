console.log('Is this challenge working?');

/*
 ! EARTHQUAKE CHALLENGE
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

/*
 ! CHALLENGE ADDITION: Create new map layers.
 */
let lightMap = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey,
  }
);

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
  Streets: streets,
  Satellite: satelliteStreets,
  Light: lightMap,
  Dark: darkMap,
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

/*
 ! CHALLENGE ADDITION: Create the tectonic plate layer for the map.
 */
let tectonicPlates = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes,
  'Tectonic Plates': tectonicPlates,
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets],
});

// Pass our baseMaps and overlays into our layers control, and add the layers control to the map.
// The overlays allows the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: '#000000',
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5,
  };
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return '#ea2c2c';
  }
  if (magnitude > 4) {
    return '#ea822c';
  }
  if (magnitude > 3) {
    return '#ee9c00';
  }
  if (magnitude > 2) {
    return '#eecc00';
  }
  if (magnitude > 1) {
    return '#d4ee00';
  }
  return '#98ee00';
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// Retrieve the earthquake GeoJSON data.
d3.json(
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
).then(function (data) {
  // Create a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      // console.log(data);
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    // after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        'Magnitude: ' +
          feature.properties.mag +
          '<br> Location: ' +
          feature.properties.place
      );
    },
  }).addTo(earthquakes);

  // Then add the earthquake layer to our map.
  earthquakes.addTo(map);

  // Create a legend control object
  let legend = L.control({
    position: 'bottomright',
  });

  // Then add all the details for the legend.
  legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      '#98ee00',
      '#d4ee00',
      '#eecc00',
      '#ee9c00',
      '#ea822c',
      '#ea2c2c',
    ];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitudes.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(magnitudes[i] + 1) +
        '"></i> ' +
        magnitudes[i] +
        (magnitudes[i + 1] ? '&ndash; ' + magnitudes[i + 1] + '<br>' : '+');
    }
    return div;
  };

  legend.addTo(map);
});

/*
! CHALLENGE: Retrieve the tectonic plate GeoJSON data & add the tectonic plate layer to our map.
*/
d3.json(
  'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json'
).then(function (data) {
  L.geoJSON(data, {
    style: {
      color: 'orange',
    },
  }).addTo(tectonicPlates);

  tectonicPlates.addTo(map);
});