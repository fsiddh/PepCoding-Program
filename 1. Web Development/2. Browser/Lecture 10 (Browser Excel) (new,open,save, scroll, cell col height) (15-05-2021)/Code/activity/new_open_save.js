// SAVE
// <a href = "www.google.com" download="file.json"></a>

let download = document.querySelector(".download");
download.addEventListener("click", function () {
	const data = JSON.stringify(workSheetDb);
	// blob
	// excel -> npm xlsx hw
	const blob = new Blob([data], { type: "application/json" }); // converts data to file of this type
	const url = window.URL.createObjectURL(blob); // creates file to url

	// download btn
	let a = document.createElement("a");
	// download
	a.download = "file.json"; // downloads in this file
	a.href = url; // url contains data
	a.click();
});

// OPEN
/* <input type="file" class="open-file"> */
let input = document.querySelector(".open-file");
input.addEventListener("change", function () {
	let files = input.files;
	let reqFileObj = files[0];
	var fr = new FileReader();
	fr.readAsText(reqFileObj);
	fr.addEventListener("load", function () {
		// data;
		// excel
		console.log(fr.result);
	});
	// Json parse
	// sheetdB-> current data
	// ui render
});

// NEW
// ui empty ->worksheetDB empty
