const fs = require("fs");
const path = require("path");
const json2xls = require("json2xls");

function readDirContent(file_name) {
    console.log(file_name);
	let file_path = path.join(__dirname, "Information", file_name);

	fs.readFile(file_path, "utf8", function (err, body) {
		if (body != "") {
			var jsonData = JSON.parse(body);

			var xls = json2xls(jsonData);
			fs.writeFileSync(
				path.join(__dirname, "Information", file_name + ".xlsx"),
				xls,
				"binary"
			);
		}
	});
}

let dir_path = path.join(__dirname, "Information");
fs.readdir(dir_path, function (error, dirs) {
	if (error) {
		console.log("Unable to Scan dir_path!");
	} else {
		readDirContent(dirs[0]);
	}
});
