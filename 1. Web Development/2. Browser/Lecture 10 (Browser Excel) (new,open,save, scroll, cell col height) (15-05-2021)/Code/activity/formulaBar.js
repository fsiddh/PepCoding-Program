// ====FORMULA BAR FUNCTIONS======================================================================================================

// eg taken => C1 = " A1 + B1 "
//                    10 + 20
// There are 4 Cases in FORMULA BAR:

// Case 1: Value to Value
// Case 2: Formula to Value
//		   => if FtV -> parent k child me se hato + formula hatao (removeFormula)
//		   => DB value change
//		   => C1 k children pr impact dekho (changeChildren)
for (let i = 0; i < allCells.length; i++) {
	allCells[i].addEventListener("blur", function () {
		let address = addressBar.value; //A1
		let { rid, cid } = getRIdCIdfromAddress(address); //00
		let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

		let cellObject = sheetDB[rid][cid];

		if (cellObject.value == cell.innerText) {
			return;
		}

		if (cellObject.formula != "") {
			removeFormula(cellObject, address);
		}

		cellObject.value = cell.innerText;

		changeChildren(cellObject);
	});
}

// Case 3: Value to Formula
// Case 4: Formula to Formula
// 		   => new formula input se lo
// 		   => if FtF -> parent k child me se hatao + formula hatao (removeFormula)
// 		   => naye formula se calculate kro (evaluateFormula)
// 		   => display calculated value (updateUI)
// 		   => DB edits => value,formula,children (setFormula)
// 		   => C1 k children pr impact dekho (changeChildren)
formulaBarInput.addEventListener("keydown", function (e) {
	if (e.key == "Enter" && formulaBarInput.value != "") {
		let newFormula = formulaBarInput.value;

		let address = addressBar.value; // C1
		let { rid, cid } = getRIdCIdfromAddress(address); //00
		let cellObject = sheetDB[rid][cid];
		let oldFormula = cellObject.formula;

		if (oldFormula == newFormula) {
			return;
		}

		// Cycle Detection
		let isCycle = checkCycle(address, newFormula);
		if (isCycle == true) {
			console.log("Cycle Detected");
			return;
		}
		console.log("Cycle Not Detected");

		if (oldFormula != "" && oldFormula != newFormula) {
			removeFormula(cellObject, address);
		}

		let evaluatedValue = evaluateFormula(newFormula);

		updateUI(evaluatedValue, rid, cid);
		setFormula(evaluatedValue, newFormula, rid, cid, address);
		changeChildren(cellObject);
	}
});

// ====HELPING FUNCTIONS======================================================================================================

// if C1 = " A1 + B1 "  => A1,B1 ke children me se C1 ko hatana
//						=> cellObject.formula = "";
function removeFormula(cellObject, address) {
	let formula = cellObject.formula; // C1 = " A1 + B1 "
	let formulaTokens = formula.split(" "); // ["A1", "+", "B1",]
	for (let i = 0; i < formulaTokens.length; i++) {
		let firstCharofToken = formulaTokens[i].charCodeAt(0);
		if (firstCharofToken >= 65 && firstCharofToken <= 90) {
			let parentAddress = formulaTokens[i]; // A1
			let parentRIdCId = getRIdCIdfromAddress(parentAddress);
			let parentCellObject = sheetDB[parentRIdCId.rid][parentRIdCId.cid];

			let parentsChildren = parentCellObject.children;
			let idxOfChildtoRemove = parentsChildren.indexOf(address); // address = "C1"
			parentsChildren.splice(idxOfChildtoRemove, 1);
		}
	}
	cellObject.formula = "";
}

// C1 change to uske children affected ( eg. C1.children = D1)
// for all children of C1
//		=> go to child,evaluate their new value via formula
//		=> display new value
//		=> DB value change
//		=> check for child's children now (recursion)
//		=> repeat for next child
function changeChildren(cellObject) {
	let children = cellObject.children; // D1

	for (let i = 0; i < children.length; i++) {
		let childAddress = children[i]; // "A1"
		let childRIdCId = getRIdCIdfromAddress(childAddress);
		let childCellObject = sheetDB[childRIdCId.rid][childRIdCId.cid];
		let childCellFormula = childCellObject.formula;
		let evaluatedValue = evaluateFormula(childCellFormula);

		updateUI(evaluatedValue, childRIdCId.rid, childRIdCId.cid);

		childCellObject.value = evaluatedValue;
		changeChildren(childCellObject);
	}
}

// returns ans calculated via formula
function evaluateFormula(formula) {
	// formula =" A1 + B1 "

	let formulaTokens = formula.split(" "); // ["(", "A1", "+", "B1", ")"]

	for (let i = 0; i < formulaTokens.length; i++) {
		let firstCharofToken = formulaTokens[i].charCodeAt(0); // ex) "A1".charCodeAt(0) -> 65
		if (firstCharofToken >= 65 && firstCharofToken <= 90) {
			let parentAddress = formulaTokens[i]; // "A1"
			let { rid, cid } = getRIdCIdfromAddress(parentAddress);

			let parentCellObject = sheetDB[rid][cid];
			let { value } = parentCellObject;

			formula = formula.replace(formulaTokens[i], value); // A1 => A1 pr jo value
		}
	}
	// formula = (10 + 20)
	let ans = eval(formula); // 10 + 20 =30
	return ans;
}

// display calculated value at C1
function updateUI(evaluatedValue, rid, cid) {
	document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText =
		evaluatedValue;
}

// DB edits => value,formula,children
function setFormula(evaluatedValue, newFormula, rid, cid, address) {
	let cellObject = sheetDB[rid][cid];
	cellObject.value = evaluatedValue;
	cellObject.formula = newFormula;

	let formulaTokens = newFormula.split(" ");
	for (let i = 0; i < formulaTokens.length; i++) {
		let firstCharOfToken = formulaTokens[i].charCodeAt(0);
		if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
			let parentRIdCId = getRIdCIdfromAddress(formulaTokens[i]);
			let cellObject = sheetDB[parentRIdCId.rid][parentRIdCId.cid];
			cellObject.children.push(address);
		}
	}
}

function checkCycle(address, newFormula) {
	let formulaTokens = newFormula.split(" ");

	let { rid, cid } = getRIdCIdfromAddress(address);
	let cellObject = sheetDB[rid][cid];
	let myChildren = cellObject.children;

	for (let i = 0; i < myChildren.length; i++) {
		let childAddress = myChildren[i];
		for (let i = 0; i < formulaTokens.length; i++) {
			let firstCharofToken = formulaTokens[i].charCodeAt(0);
			if (firstCharofToken >= 65 && firstCharofToken <= 90) {
				let parentAddress = formulaTokens[i]; // A1

				if (parentAddress == childAddress) {
					return true;
				}
			}
		}

		return checkCycle(childAddress, newFormula);
	}
	return false;
}
