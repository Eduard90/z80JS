function handleFileSelect(evt) {
	// console.log(this.files);
	if (this.files.length == 0) {
		alert('Error. Please select file');
		return;
	}

	var file = this.files[0];
	var reader = new FileReader();

	reader.onload = function(event) {
		var content = event.target.result;
		var contentArr = new Uint8Array(content);
		for(var i = 0; i < contentArr.length; i++) {
			console.log(contentArr[i]);
		}

		app.load(contentArr);
		app.start();
	}

	reader.readAsArrayBuffer(file);
}

//document.getElementById('file').addEventListener('change', handleFileSelect, false);
