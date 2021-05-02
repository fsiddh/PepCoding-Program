let addBtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");

let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click", handleActiveSheet); // We didn't added EventListener on First Sheet

// Add click krne se New Sheet aa jaye
addBtnContainer.addEventListener("click", function () {
	let sheetsArr = document.querySelectorAll(".sheet");
	let lastSheetElem = sheetsArr[sheetsArr.length - 1];
	let idx = lastSheetElem.getAttribute("sheetIdx");

	idx = Number(idx);

	let newSheet = document.createElement("div");
	newSheet.setAttribute("class", "sheet");
	newSheet.setAttribute("sheetIdx", idx + 1);
	newSheet.innerText = `Sheet ${idx + 1}`;

	// Add new Sheet in sheet list
	sheetList.appendChild(newSheet); // Append current Sheet in old Sheets list
	newSheet.addEventListener("click", handleActiveSheet); // add Event Listner for Every newSheet
});

function handleActiveSheet(e) {
	let mySheet = e.currentTarget;
	let sheetsArr = document.querySelectorAll(".sheet");
	sheetsArr.forEach(function (sheet) {
		sheet.classList.remove("active-sheet");
	});
	if (!mySheet.classList[1]) {
		mySheet.classList.add("active-sheet");
	}
}

// Grid Container JS
let topRow = document.querySelector(".top-row");
let str = "";
for (let i = 0; i < 26; i++) {
	str += `<div class='col'>${String.fromCharCode(65 + i)}</div>`;
}
topRow.innerHTML = str;
let leftCol = document.querySelector(".left-col");
str = "";
for (let i = 0; i < 100; i++) {
	str += `<div class='left-col_box'>${i + 1}</div>`;
}
leftCol.innerHTML = str;

// 2d array
let grid = document.querySelector(".grid");
str = "";
for (let i = 0; i < 100; i++) {
	str += `<div class="row">`;
	for (let j = 0; j < 26; j++) {
		str += `<div class='col'>${String.fromCharCode(65 + j)}${i + 1}</div>`;
	}
	str += "</div>";
}
grid.innerHTML = str;
