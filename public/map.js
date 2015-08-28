$(document).ready(function() {
	var map = L.map('map').setView([57.664, 11.935], 11);
	var gpxform = document.getElementById('upload-gpx-form');
	var fileSelect = document.getElementById('file-select');
	var uploadButton = document.getElementById('upload-button');

	gpxform.onsubmit = function(event) {
		event.preventDefault();
		uploadButton.innerHtml = "Uploading...";
		var files = fileSelect.files;
		var formData = new FormData();
		// Loop through each of the selected files.
		for (var i = 0; i < files.length; i++) {
		  var file = files[i];
		  // Add the file to the request.
		  formData.append('gpxfiles', file, file.name);
		}
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/location', true);
		// Set up a handler for when the request finishes.
		xhr.onload = function () {
		  if (xhr.status === 200) {
		    // File(s) uploaded.
		    uploadButton.innerHTML = 'Upload';
		  } else {
		    alert('An error occurred!');
		  }
		};
		xhr.send(formData);
	};

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
		.addTo(map);

	//add point marker from api
	$.getJSON("/api/point", function(result) {
		var latlng = [result['lat'],result['long']];
		L.marker( latlng ).addTo(map);
	});

	//add run track from api
	$.getJSON("/api/runtracks", function(result) {
		for (var i = 0; i < result.length; i++) {
			var runtrackPoints = result[i].points;
			var lineCoords = [];
			for (var j =0; j < runtrackPoints.length; j++) {
				var lat = runtrackPoints[j]['loc']['lat'];
				var lng = runtrackPoints[j]['loc']['lng'];
				lineCoords.push([lng, lat]);
				L.marker([lng,lat]).addTo(map);
			}
			L.polyline(lineCoords, {color: 'red', stroke: 'true', weight: 5}).addTo(map);
		}
	});
});
