let addBtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");

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

// Upon clicking any cell, it's address will show up on address bar
for (let i = 0; i < allCells.length; i++) {
	allCells[i].addEventListener("click", function handleCell() {
		let rid = Number(allCells[i].getAttribute("rid"));
		let cid = Number(allCells[i].getAttribute("cid"));

		let rowAdd = rid + 1;
		let colAdd = String.fromCharCode(cid + 65);

		let address = colAdd + rowAdd;
		
		addressBar.value = address;
	})
}

// Bydefault Page render -> first cell's address -> shows on Address Bar
allCells[0].click();