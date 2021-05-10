// ====FORMULA BAR FUNCTIONS======================================================================================================

// There are 4 Cases in FORMULA BAR:

// Case 1: Value to Value
// Case 2: Formula to Value
for (let i = 0; i < allCells.length; i++) {
	allCells[i].addEventListener("blur", function () {
		let address = addressBar.value;
		let { rid, cid } = getRIdCIdfromAddress(address);
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
formulaBarInput.addEventListener("keydown", function (e) {
	if (e.key == "Enter" && formulaBarInput.value != "") {
		let newFormula = formulaBarInput.value;

		let address = addressBar.value;
		let { rid, cid } = getRIdCIdfromAddress(address);
		let cellObject = sheetDB[rid][cid];
		let oldFormula = cellObject.formula;

		if (oldFormula == newFormula) {
			return;
		}

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

function removeFormula(cellObject, address) {
	let formula = cellObject.formula;
	let formulaTokens = formula.split(" ");
	for (let i = 0; i < formulaTokens.length; i++) {
		let firstCharofToken = formulaTokens[i].charCodeAt(0);
		if (firstCharofToken >= 65 && firstCharofToken <= 90) {
			let parentAddress = formulaTokens[i];
			let parentRIdCId = getRIdCIdfromAddress(parentAddress);
			let parentCellObject = sheetDB[parentRIdCId.rid][parentRIdCId.cid];

			let parentsChildren = parentCellObject.children;
			let idxOfChildtoRemove = parentsChildren.indexOf(address);
			parentsChildren.splice(idxOfChildtoRemove, 1);
		}
	}
	cellObject.formula = "";
}

function changeChildren(cellObject) {
	let children = cellObject.children;
	console.log(children);
	for (let i = 0; i < children.length; i++) {
		let childAddress = children[i];
		let childRIdCId = getRIdCIdfromAddress(childAddress);
		let childCellObject = sheetDB[childRIdCId.rid][childRIdCId.cid];
		let childCellFormula = childCellObject.formula;
		let evaluatedValue = evaluateFormula(childCellFormula);

		updateUI(evaluatedValue, childRIdCId.rid, childRIdCId.cid);

		childCellObject.value = evaluatedValue;
		changeChildren(childCellObject);
	}
}

function evaluateFormula(formula) {
	// formula = "A1 + A2"

	let formulaTokens = formula.split(" "); // ["(", "A1", "+", "A2", ")"]

	for (let i = 0; i < formulaTokens.length; i++) {
		let firstCharofToken = formulaTokens[i].charCodeAt(0); // ex) "A1".charCodeAt(0) -> 65
		if (firstCharofToken >= 65 && firstCharofToken <= 90) {
			let parentAddress = formulaTokens[i]; // "A1"
			let { rid, cid } = getRIdCIdfromAddress(parentAddress);

			let parentCellObject = sheetDB[rid][cid];
			let { value } = parentCellObject;

			formula = formula.replace(formulaTokens[i], value);
		}
	}
	// formula = (10 + 20) = 30
	let ans = eval(formula);
	return ans;
}

function updateUI(evaluatedValue, rid, cid) {
	document.querySelector(
		`.col[rid="${rid}"][cid="${cid}"]`
	).innerText = evaluatedValue;
}

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
