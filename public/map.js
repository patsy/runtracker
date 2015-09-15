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

	var showTrack = function() {
		$.ajax({
			url : '/api/feature/' + this.id,
			method : 'GET',
			dataType : 'JSON',
			success : function(data, status, jqXHR) {
				var line = L.geoJson(data).addTo(map);
				map.fitBounds(line.getBounds());
			}
		})
	}

	// Add updateTrack to all divs with class trackdiv
	$(".trackdiv").click(showTrack);
});
