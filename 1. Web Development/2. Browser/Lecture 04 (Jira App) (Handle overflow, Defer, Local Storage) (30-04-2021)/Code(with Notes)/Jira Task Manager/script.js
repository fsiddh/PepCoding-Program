"use strict";

let mainContainer = document.querySelector(".main_container");
let bothElementsArr = document.querySelectorAll(".icon-container");
let crossBtn = bothElementsArr[1];
let plusButton = bothElementsArr[0];
let body = document.body;
let deleteState = false;

// For new Session
// If we had tasks in old Session, this fetch and create those tasks
let taskArr = [];
if (localStorage.getItem("allTask")) {
	// If we had old tasks
	taskArr = JSON.parse(localStorage.getItem("allTask")); // get'em and parse into noraml array from
	// Display'em on UI
	for (let i = 0; i < taskArr.length; i++) {
		let { id, color, task } = taskArr[i];

		// Sending "false" so that pehele sare purane tasks
		// pr sare event listners lag jaye (delete krne ka, desc update krne ka, color change krne ka etc).
		// Fir jab "true" hoga It'll mean naya taskBox bana hai, now store it in local storage and add eventListners n all!
		createTask(color, task, false, id);
	}
}

// Click plus btn to create a new Task
plusButton.addEventListener("click", createModal);

// cross btn is pressed and unpressed
crossBtn.addEventListener("click", setDeleteState);

// creates Modal Container
function createModal() {
	let modalContainer = document.querySelector(".modal_container");

	// If "modalContainer" haven't been created yet, create one
	if (modalContainer == null) {
		modalContainer = document.createElement("div");
		modalContainer.setAttribute("class", "modal_container");
		modalContainer.innerHTML = `
        <div class="input_container">
            <textarea class="modal_input" 
            placeholder="Enter Your text"></textarea>
        </div>
        <div class="modal_filter_container">
            <div class="filter pink"></div>
            <div class="filter blue"></div>
            <div class="filter green"></div>
            <div class="filter black"></div>
        </div>`;
		body.appendChild(modalContainer);
		handleModal(modalContainer);
	}

	// Remove the text you wrote in this modalContainer
	let textarea = modalContainer.querySelector(".modal_input");
	textarea.value = "";
}

function handleModal(modal_container) {
	let cColor = "black";
	let modalFilters = document.querySelectorAll(
		".modal_filter_container .filter"
	);

	modalFilters[3].classList.add("border"); // Bydefault adds border on black filter

	// Removes border from every filter then adds on the filter which is clicked
	for (let i = 0; i < modalFilters.length; i++) {
		// Adding eventListner on every filter
		// taaki sare filters ke pass functionality ho ->
		// click krne pe remove border from every filter and add ho jaye uss clicked filter pe
		modalFilters[i].addEventListener("click", function () {
			// remove broder from every filter
			modalFilters.forEach((filter) => {
				filter.classList.remove("border");
			});

			// adds broder on clicked filter
			modalFilters[i].classList.add("border");

			// ex: "modalFilters[i]" gives -> "filter black border"
			// Then select data on idx == 1, which gives the color
			cColor = modalFilters[i].classList[1];
			console.log("current color of task", cColor);
		});
	}

	let textArea = document.querySelector(".modal_input");
	textArea.addEventListener("keydown", function (e) {
		// Agr inpur area khali na ho && Enter press ho jaye ->
		// Delete current Modal and create taskBox with current Modal's data
		if (e.key == "Enter" && textArea.value != "") {
			//  remove modal
			modal_container.remove();

			// create taskBox 
			// Here "true" means abhi naya textBox bana hai -> store its info in local storage
			// then add all eventListners n all.
			createTask(cColor, textArea.value, true);
		}
	});
}

function createTask(color, task, flag, id) {
	// Creating div for taskBox
	let taskContainer = document.createElement("div");

	// Getting Unique ID
	let uifn = new ShortUniqueId();
	let uid = id || uifn();

	taskContainer.setAttribute("class", "task_container");
	taskContainer.innerHTML = `
    <div class="task_filter ${color}"></div>
    <div class="task_desc_container">
        <h3 class="uid">#${uid}</h3>
        <div class="task_desc" contenteditable="true" >${task}</div>
    </div>`;
	mainContainer.appendChild(taskContainer);

	// Store/Set current Session's textBox info in local storage
	if (flag == true) {
		let obj = {
			task: task,
			id: `${uid}`,
			color: color,
        };
        taskArr.push(obj);
        
		let finalArr = JSON.stringify(taskArr);
		localStorage.setItem("allTask", finalArr);
	}

    // Adding eventListner of changing color of taskFilter on every taskBox
	let taskFilter = taskContainer.querySelector(".task_filter");
    taskFilter.addEventListener("click", changeColor);
    
    // Adding eventListner of getting deleted(if crossBtn is pressed) on every taskBox
    taskContainer.addEventListener("click", deleteTask);
    
    // Adding eventListner for editing taskDesc on every taskBox
	let taskDesc = taskContainer.querySelector(".task_desc");
	taskDesc.addEventListener("keypress", editTask);
}

// Change color of taskBox
function changeColor(e) {
	let taskFilter = e.currentTarget;
	let colors = ["pink", "blue", "green", "black"];
	let cColor = taskFilter.classList[1];
	let idx = colors.indexOf(cColor);
    let newColorIdx = (idx + 1) % 4;
    
	taskFilter.classList.remove(cColor);
	taskFilter.classList.add(colors[newColorIdx]);
}

// add and removes "active" class from crossBtn
// active == pressed && unactive == unpressed
function setDeleteState(e) {
	let crossBtn = e.currentTarget;
	if (deleteState == false) {
		crossBtn.classList.add("active");
	} else {
		crossBtn.classList.remove("active");
	}

	// Jo bhi state hai uska ulta ho jaega(toggle)
	deleteState = !deleteState;
}

function deleteTask(e) {
	let taskContainer = e.currentTarget;

	// If crossBtn is pressed -> delt taskBox/taskContainer which is clicked
	if (deleteState) {
		// Get unique ID of taskBox which is clicked
		let uidElem = taskContainer.querySelector(".uid");
		let uid = uidElem.innerText.split("#")[1];

		// Amongst all the taskBoxes find the taskBox whose id matches uid 
		for (let i = 0; i < taskArr.length; i++) {
			let { id } = taskArr[i];
			if (uid == id) {
				// Remove task at "taskArr[i]"
				taskArr.splice(i, 1); // This means remove 1 element at index i

				// set/store new taskArr(taskArr without "taskArr[i]") by updating taskArr in local storage
				let newTaskArr = JSON.stringify(taskArr);
				localStorage.setItem("allTask", newTaskArr);

				// remove taskBox(of "taskArr[i]")
				taskContainer.remove();
				break;
			}
		}
	}
}

function editTask(e) {
	let taskDesc = e.currentTarget;

	// Get uid of textDesc which is clicked
	let uidElem = taskDesc.parentNode.children[0];
	let uid = uidElem.innerText.split("#")[1];

	// For uid -> update "taskArr[i].task" by updated desc in local storage
	for (let i = 0; i < taskArr.length; i++) {
		let { id } = taskArr[i];
		
		if (uid == id) {
			taskArr[i].task = taskDesc.innerText; // local storage me task ke andr purana desc. ko update by naya desc .

			let newTaskArr = JSON.stringify(taskArr);
			localStorage.setItem("allTask", newTaskArr);

			break;
		}
	}
}
