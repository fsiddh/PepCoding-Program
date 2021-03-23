const fs = require("fs");
const json2xls = require("json2xls");
const path = require("path");

let file_path = path.join(__dirname, "Ambati Rayudu .json");

fs.readFile(file_path, 'utf8', function(err,body){
    var jsonData = JSON.parse(body);

    var xls = json2xls(jsonData);
    fs.writeFileSync('final-test.xlsx', xls, 'binary');
});