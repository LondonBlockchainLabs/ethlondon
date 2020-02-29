var jsonURLs = ['../data/GBR.json', '../data/FRA.json', '../data/DEU.json'];
var jsonPromises = [];
var geojsonZones = [];

jsonURLs.forEach((url) => {
    jsonPromises.push(d3.json(url));
})

Promise.all(jsonPromises).then(function(data) {
  geojsonZones = data;
  data.forEach(function (geojson, i) {

    map.addSource(geojson.properties['ISO_A3_EH'] + '-source', {
      "type": 'geojson',
      'data': geojson
    });

    map.addLayer({
      'id': geojson.properties['ISO_A3_EH'],
      'type': 'fill',
      'source': geojson.properties['ISO_A3_EH'] + '-source',
      'layout': {},
      'paint': {
        'fill-color': color[i],
        'fill-opacity': 0.4
      }
    });

  })
});
