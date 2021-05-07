let addBtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");

let boldBtn = document.querySelector(".bold");
let underlineBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");
let fontSizeElem = document.querySelector(".font-size");
let leftBtn = document.querySelector(".left");
let centerBtn = document.querySelector(".center");
let rightBtn = document.querySelector(".right");

let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click", handleActiveSheet); // We didn't added EventListener on First Sheet

// Upon clicking any cell, it's address will show up on address bar
for (let i = 0; i < allCells.length; i++) {
	allCells[i].addEventListener("click", function handleCell() {
		let rid = Number(allCells[i].getAttribute("rid"));
		let cid = Number(allCells[i].getAttribute("cid"));

		let rowAdd = rid + 1;
		let colAdd = String.fromCharCode(cid + 65);

		let address = colAdd + rowAdd;

		addressBar.value = address;
	});
}

// Bydefault Page render -> first cell's address -> shows on Address Bar
allCells[0].click();

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

// Font Size
fontSizeElem.addEventListener("change", function () {
	let fontSize = fontSizeElem.value;

	let cellAddress = addressBar.value;
	let { rid, cid } = getRIdCIdfromAddress(cellAddress);

	let cellElem = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
	cellElem.style.fontSize = fontSize + "px";
});

//Alignment Functions
// left align
leftBtn.addEventListener("click", handleAlign);
// center align
centerBtn.addEventListener("click", handleAlign);
// right align
rightBtn.addEventListener("click", handleAlign);

// BUI
// Bold
boldBtn.addEventListener("click", handleBUI);
// Underline
underlineBtn.addEventListener("click", handleBUI);
// Italic
italicBtn.addEventListener("click", handleBUI);

// All Re-Usable Functions (fns which are used above)

// On clicking a sheet it gets selected/active
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

// Handles Alignment when LCR is pressed
function handleAlign(e) {
	let myAlignBtn = e.currentTarget; // <input class="left" type="button" value="L">
	let alignName = myAlignBtn.classList[0]; // "left"

	// Gets address displayed in the address Bar
	let address = addressBar.value;

	let { rid, cid } = getRIdCIdfromAddress(address);

	// Selects the clicked cell and asigns the resp. alignment to it
	let cellElem = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
	cellElem.style.textAlign = alignName;

	// console.log(alignName, rid, cid, cellElem.style.textAlign);
}

// Handles Bold, Underline and Italic styles of a cell
function handleBUI(e) {
	let myBtn = e.currentTarget;
	let myBtnStyleName = myBtn.classList[0];

	let address = addressBar.value;
	let { rid, cid } = getRIdCIdfromAddress(address);

	let cellElem = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

	if (myBtnStyleName == "bold") {
		cellElem.style.fontWeight = myBtnStyleName;
	} else if (myBtnStyleName == "underline") {
		cellElem.style.textDecoration = myBtnStyleName;
	} else {
		cellElem.style.fontStyle = myBtnStyleName;
	}
}

// Given address(ex="A1") -> returns its rid(0) and cid(0)
function getRIdCIdfromAddress(address) {
	//ex. address = A1
	let cellColAdrs = address[0].charCodeAt(); // "A" -> 65
	let cellRowAdrs = Number(address[1]); // "1" -> 1

	let cid = cellColAdrs - 65; // "- 65" -> to get the col no.
	let rid = cellRowAdrs - 1; // "-1" karre bcz apne UI ke liye "+1" krke dala tha

	return { rid, cid };
}
