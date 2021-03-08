let fs = require("fs");
let path = require("path");

function getContent(dirPath){
    let contents = fs.readdirSync(dirPath, "UTF-8");
    console.log(contents);
}

// getContent("s_test.txt")

module.exports = {
    fileFn: getContent
}