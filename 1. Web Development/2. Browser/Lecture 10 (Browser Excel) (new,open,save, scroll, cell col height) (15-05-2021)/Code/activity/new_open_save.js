let download = document.querySelector(".download");
let clear = document.querySelector(".new");

// SAVE
// <a href = "www.google.com" download="file.json"></a>
download.addEventListener("click", function () {
	const data = JSON.stringify(workSheetDb);
	// blob
	// excel -> npm xlsx hw
	const blob = new Blob([data], { type: "application/json" }); // converts data to file of this type
	const url = window.URL.createObjectURL(blob); // creates file to url
	const jsonData = JSON.parse(data);
	const xls = json2xls(jsonData);
	// download btn
	let a = document.createElement("a");
	// download
	a.download = "file.json"; // downloads in this file
	a.href = url; // url contains data
	a.click();
});

// // OPEN
// /* <input type="file" class="open-file"> */
// input.addEventListener("change", function () {
// 	let files = input.files;
// 	let reqFileObj = files[0];
// 	var fr = new FileReader();
// 	fr.readAsText(reqFileObj);
// 	fr.addEventListener("load", function () {
// 		// data;
// 		// excel
// 		console.log(fr.result);
// 	});
// 	// Json parse
// 	// sheetdB-> current data
// 	// ui render
// });

// NEW
// ui empty ->worksheetDB empty

clear.addEventListener("click", function (e) {
	// console.log(sheetDB);
	initUI();
	let newSheetDB = cleanSheetDB();
	sheetDB = newSheetDB;
	// console.log(sheetDB);
})

function cleanSheetDB() {
	let newSheetDB = []; // Stores data of all cells present in the sheet
	for (let i = 0; i < 100; i++) {
		let row = [];
		for (let j = 0; j < 26; j++) {
			let cell = {
				bold: false,
				italic: "noraml",
				underline: "none",
				fontFamily: "Arial",
				fontSize: "16",
				halign: "left",
				value: "",
				children: [],
				formula: "",
			};
			row.push(cell);
		}
		newSheetDB.push(row);
	}
	return newSheetDB;
}
