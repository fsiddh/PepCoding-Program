let input = document.querySelector(".input_box");
let ul = document.querySelector(".tasks_ul");
let localStorageArr = [];

// To Retain Old data from Local Storage and Display it
if (localStorage.getItem("allTask")) {
    let stringArr = localStorage.getItem("allTask");
    localStorageArr = JSON.parse(stringArr);

    for (let i = 0; i < localStorageArr.length; i++) {
        let li = document.createElement("li");
        li.innerText = localStorageArr[i];

        // This event listner is for purane tasks
        // Purane tasks pe dbclick karoge to delete honge
        li.addEventListener("dblclick", function () {
            li.remove();
            localStorage.removeItem("allTask", "Task 1");
		});

		li.setAttribute("class", "tasks");
		ul.appendChild(li);
    }
}

input.addEventListener("keydown", function (e) {
	// console.log(e.key);
	if (e.key == "Enter") {
		let task = input.value;

		let li = document.createElement("li");
		li.innerText = task;

		// ---------------Setting Up Local Storage---------------

        // If We already had a data in our Arr from prev session
        // Update our current Arr and add further tasks in it!
		if (localStorage.getItem("allTask")) {
			// Got locally stored data in form of Arr
			let stringArr = localStorage.getItem("allTask");

			// Converted string data into arr for further usage
			localStorageArr = JSON.parse(stringArr);
		}
		localStorageArr.push(task);
		let stringArr = JSON.stringify(localStorageArr); // To store data must be of type string!
		localStorage.setItem("allTask", stringArr); // It stores in the form of (key, value) pair

        //-------------------------------------------------------

		li.addEventListener("dblclick", function () {
			li.remove();
		});

		li.setAttribute("class", "tasks");
		ul.appendChild(li);

		input.value = " ";
	}
});
