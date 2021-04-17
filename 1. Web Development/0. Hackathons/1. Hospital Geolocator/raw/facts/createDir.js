const path = require("path");
const fs = require("fs");

function infoDir(){
    let folderPath = path.join(__dirname, "Utilities", "Information");

    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}
