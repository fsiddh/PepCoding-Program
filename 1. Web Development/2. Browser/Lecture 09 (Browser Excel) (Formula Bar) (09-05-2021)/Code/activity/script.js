let addBtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");

let fontFamilyElem = document.querySelector(".font-family");
let fontSizeElem = document.querySelector(".font-size");

let boldBtn = document.querySelector(".bold");
let underlineBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");

let leftBtn = document.querySelector(".left");
let centerBtn = document.querySelector(".center");
let rightBtn = document.querySelector(".right");
let allAlignBtns = document.querySelectorAll(".alignment-container>*");

// ====DEFAULT CODE======================================================================================================
let sheetDB = workSheetDb[0]; // initally ek db rhega prog start hote hee
initUI(); // initially assign default formatting to every cell of sheet1

let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click", handleActiveSheet); // We didn't added EventListener on First Sheet

// click cell => 1.address box = clicked cell address ("A1")
//            => 2. restore formating of resp cell
for (let i = 0; i < allCells.length; i++) {
	allCells[i].addEventListener("click", function handleCell() {
		let rid = Number(allCells[i].getAttribute("rid"));
		let cid = Number(allCells[i].getAttribute("cid"));

		let rowAdd = rid + 1;
		let colAdd = String.fromCharCode(cid + 65);

		let address = colAdd + rowAdd;

		addressBar.value = address;

		// Acc. to cell's prev state, update all Btns state
		let cellObject = sheetDB[rid][cid];

		// BUI
		if (cellObject.bold == true) {
			boldBtn.classList.add("active-btn");
		} else {
			boldBtn.classList.remove("active-btn");
		}

		if (cellObject.underline == "underline") {
			underlineBtn.classList.add("active-btn");
		} else {
			underlineBtn.classList.remove("active-btn");
		}

		if (cellObject.italic == "italic") {
			italicBtn.classList.add("active-btn");
		} else {
			italicBtn.classList.remove("active-btn");
		}

		// Alignment
		// First remove "active-btn" class from all alignment btns
		// Then add "active-btn" in the class which was selected for that particular cell

		for (let i = 0; i < allAlignBtns.length; i++) {
			allAlignBtns[i].classList.remove("active-btn");
		}

		if (cellObject.halign == "left") {
			// left active
			leftBtn.classList.add("active-btn");
		} else if (cellObject.halign == "right") {
			// right active
			rightBtn.classList.add("active-btn");
		} else if (cellObject.halign == "center") {
			// center active
			centerBtn.classList.add("active-btn");
		}

		// Font-Family
		let cellFont = cellObject.fontFamily;
		fontFamilyElem.value = cellFont;

		// Font-Size
		let cellSize = cellObject.fontSize;
		fontSizeElem.value = cellSize;
	});
}

// Bydefault Page render -> first cell's address -> shows on Address Bar
allCells[0].click();

// ====MENU BAR FUNCTIONS======================================================================================================
// Add click krne se New Sheet aa jaye
// click "+" =>
// 1.a.add new sheet + b.create a new db for this sheet + c.set eventListener on each sheet("active")
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

	// Create new DB for this sheet
	initCurrentSheetDb();

	// add Event Listner for Every newSheet
	newSheet.addEventListener("click", handleActiveSheet);
});

// Font Size
fontSizeElem.addEventListener("change", function () {
	let fontSize = fontSizeElem.value;

	let cellAddress = addressBar.value;
	let { rid, cid } = getRIdCIdfromAddress(cellAddress);

	let cellElem = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
	cellElem.style.fontSize = fontSize + "px";

	// Updating our temporary DB
	let cellObject = sheetDB[rid][cid];
	cellObject.fontSize = fontSize;
});

//Alignment Functions
// left align
leftBtn.addEventListener("click", handleAlign);
// center align
centerBtn.addEventListener("click", handleAlign);
// right align
rightBtn.addEventListener("click", handleAlign);

// Font-Family
fontFamilyElem.addEventListener("change", handleFontFamily);

// BUI
// Bold
boldBtn.addEventListener("click", handleBUI);
// Underline
underlineBtn.addEventListener("click", handleBUI);
// Italic
italicBtn.addEventListener("click", handleBUI);

// ====HELPING FUNCTIONS======================================================================================================
// All Re-Usable Functions (fns which are used above)

// On clicking a sheet it gets selected/active
// click sheet =>
// a.set sheetDb to current active sheet + b. empty the sheet + c.restore data on UI from db + d. click first cell
function handleActiveSheet(e) {
	// a.
	let mySheet = e.currentTarget;
	let sheetsArr = document.querySelectorAll(".sheet");
	sheetsArr.forEach(function (sheet) {
		sheet.classList.remove("active-sheet");
	});
	if (!mySheet.classList[1]) {
		mySheet.classList.add("active-sheet");
	}

	// b. + Click first cell
	initUI();

	//c.
	let activeSheetDBIdx = mySheet.getAttribute("sheetIdx") - 1; // "-1" -> as for UI we added "1".
	sheetDB = workSheetDb[activeSheetDBIdx];
	setUI(sheetDB);

	//d.
	allCells[0].click();
}

// sets initial styles on empty page
function initUI() {
	for (let i = 0; i < allCells.length; i++) {
		allCells[i].style.fontWeight = "normal";
		allCells[i].style.fontStyle = "normal";
		allCells[i].style.textDecoration = "none";
		allCells[i].style.fontFamily = "Arial";
		allCells[i].style.fontSize = "16px";
		allCells[i].style.textAlign = "left";
		allCells[i].innerText = "";
		// save text to temp DB (blur event -> detects when element is out of focus)
		allCells[i].addEventListener("blur", function handleCell() {
			let rid = allCells[i].getAttribute("rid");
			let cid = allCells[i].getAttribute("cid");
			let cellObj = sheetDB[rid][cid];
			cellObj.value = allCells[i].innerText;
		});
	}
}

// restores formatting of current active sheet on UI
function setUI(sheetDB) {
	for (let i = 0; i < sheetDB.length; i++) {
		for (let j = 0; j < sheetDB[i].length; j++) {
			let cellData = sheetDB[i][j];
			let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
			cell.style.fontWeight = cellData.bold == true ? "bold" : "normal";
			cell.style.fontStyle =
				cellData.italic == true ? "italic" : "normal";
			cell.style.textDecoration =
				cellData.underline == true ? "underline" : "none";
			cell.style.fontFamily = cellData.fontFamily;
			cell.style.fontSize = cellData.fontSize + "px";
			cell.style.textAlign = cellData.halign;
			cell.innerText = cellData.value;
		}
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

	// First -> Remove "active-btn" class from all Align btns of a cell
	// Second -> Add "active-btn" class to Align btn which was clicked/selected
	for (let i = 0; i < allAlignBtns.length; i++) {
		allAlignBtns[i].classList.remove("active-btn");
	}

	// Add active btn class to selected alignment btn
	myAlignBtn.classList.add("active-btn");

	// Updating our temporary DB
	let cellObject = sheetDB[rid][cid];
	cellObject.halign = alignName;
}

// Handles Bold, Underline and Italic styles of a cell
function handleBUI(e) {
	let myBtn = e.currentTarget;
	let myBtnStyleName = myBtn.classList[0];

	let address = addressBar.value;
	let { rid, cid } = getRIdCIdfromAddress(address);
	let cellElem = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

	// Adding "active-btn" class highlights pressed button.
	// if btn not active -> active state + b/u/i krdo + add in db
	// if btn active -> change active state + normal krdo + add in db
	let cellObject = sheetDB[rid][cid];

	if (myBtn.classList[1] != "active-btn") {
		myBtn.classList.add("active-btn");

		if (myBtnStyleName == "bold") {
			cellElem.style.fontWeight = myBtnStyleName;
			cellObject.bold = true;
		} else if (myBtnStyleName == "underline") {
			cellElem.style.textDecoration = myBtnStyleName;
			cellObject.underline = true;
		} else {
			cellElem.style.fontStyle = myBtnStyleName;
			cellObject.italic = true;
		}
	} else {
		myBtn.classList.remove("active-btn");

		if (myBtnStyleName == "bold") {
			cellElem.style.fontWeight = "normal";
			cellObject.bold = false;
		} else if (myBtnStyleName == "underline") {
			cellElem.style.textDecoration = "none";
			cellObject.underline = false;
		} else {
			cellElem.style.fontStyle = "normal";
			cellObject.italic = false;
		}
	}
}

// Handles font family of selected cell
function handleFontFamily(e) {
	let font = e.currentTarget.value;

	let address = addressBar.value;
	let { rid, cid } = getRIdCIdfromAddress(address);
	let cellElem = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

	// Updating cell's fontFamily
	cellElem.style.fontFamily = font;

	// Updating our temporary DB
	let cellObject = sheetDB[rid][cid];
	cellObject.fontFamily = font;
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
