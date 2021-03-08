let fs = require("fs");
let path = require("path");

function getContent(dirPath){
    let contents = fs.readdirSync(dirPath);
    console.log(contents);
}

module.exports = {
    fileFn: getContent
}