mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iaXNvbml2IiwiYSI6ImNqbjM5eXEwdjAyMnozcW9jMzdpbGk5emoifQ.Q_S2qL8UW-UyVLikG_KqQA';

var color = d3.schemeSet2;
var map = new mapboxgl.Map({
  container: 'zone-map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [
    14.038784600499525,
    49.29969274777156
  ],
  zoom: 2.7,
});
