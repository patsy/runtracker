var map = L.map('map').setView([57.664, 11.935], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
	.addTo(map);

//add point marker from api
$.getJSON("/api/point", function(result) {
	var latlng = [result['lat'],result['long']];
	L.marker( latlng ).addTo(map);
});

//add run track from api
$.getJSON("/api/runtrack", function(result) {
	var runtrackPoints = result[0].points;
	var coords = [];
	for (var i =0; i < result[0].points.length; i++) {
		var lat = result[0].points[i]['loc']['lat'];
		var lng = result[0].points[i]['loc']['lng'];
		coords.push([lng, lat]);
		L.marker([lng,lat]).addTo(map);
	}
	console.log(coords);
	L.polyline(coords, {color: 'red', stroke: 'true', weight: 5}).addTo(map);
});