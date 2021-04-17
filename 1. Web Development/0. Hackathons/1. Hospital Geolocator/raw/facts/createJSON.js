const path = require("path");
const fs = require("fs");

function createJSON() {
    let filePath = path.join(__dirname, informationDirName, hospitalInfoDir + ".json");

    if(fs.existsSync(filePath) == false){
        let file = fs.createWriteStream(filePath);
        file.end();
    }
}