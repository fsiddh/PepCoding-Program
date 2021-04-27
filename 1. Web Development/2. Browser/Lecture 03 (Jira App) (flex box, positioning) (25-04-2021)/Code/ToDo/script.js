let input = document.querySelector(".input_box");
let ul = document.querySelector(".tasks_ul");

input.addEventListener("keydown", function (e) {
	// console.log(e.key);
	if (e.key == "Enter") {
        let task = input.value;
        
		let li = document.createElement("li");
        li.innerText = task;
        li.setAttribute("class", "tasks");
		ul.appendChild(li);

        li.addEventListener("dblclick", function () {
            li.remove();
        })

		input.value = " ";
	}
});
