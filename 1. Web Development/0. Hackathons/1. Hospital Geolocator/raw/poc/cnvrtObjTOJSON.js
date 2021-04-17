const fs = require("fs");
const path = require("path");

let objArr = [
	{
		Name: "Bombay Hospital",
		Rating: "3.2",
		Number: " 0731 255 8866",
		Address: "No.94, IDA Scheme, 95, Eastern Ring Rd ",
		Timings: "Open 24 hours",
	},
	{
		"Time to Reach": "21 min",
		Distance: "(10.0 km)",
		"Google Maps Link":
			"https://www.google.com/maps/dir/County+Walk+Twp,+Indore,+Madhya+Pradesh+453771/No.94,+Bombay+Hospital,+IDA+Scheme,+95,+Eastern+Ring+Rd,+Tulsi+Nagar,+Vijay+Nagar,+Indore,+Madhya+Pradesh+452010/@22.754501,75.9013511,17z/am=t/data=!4m13!4m12!1m5!1m1!1s0x3962e28027225669:0xc627810466c09cab!2m2!1d75.9535815!2d22.765564!1m5!1m1!1s0x39631d54503f21d3:0xc114629679b13584!2m2!1d75.9035451!2d22.754501",
	},
];

function readDirContent(file_name) {
	let file_path = path.join(__dirname, "Information", file_name + ".json");
	if (fs.existsSync(file_path) == false) {
		fs.writeFileSync(file_path, JSON.stringify(objArr));
	} else {
		let data = fs.readFileSync(file_path, "UTF-8");
		if (data.length == 0) {
			data = [];
		} else {
			data = JSON.parse(data);
		}
		data.push(obj);
		fs.writeFileSync(file_path, JSON.stringify(data));
	}
}

let dir_path = path.join(__dirname, "Information");
fs.readdir(dir_path, function (error, dirs) {
	if (error) {
		console.log("Unable to Scan dir_path!");
	} else {
		readDirContent(dirs[0]);
	}
});
