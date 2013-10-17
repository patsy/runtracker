var map = L.map('map').setView([57.664, 11.935], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
	.addTo(map);

//add marker from api
$.getJSON("/api/point", function(result) {
	var latlng = [result['lat'],result['long']];
	L.marker( latlng ).addTo(map);
});