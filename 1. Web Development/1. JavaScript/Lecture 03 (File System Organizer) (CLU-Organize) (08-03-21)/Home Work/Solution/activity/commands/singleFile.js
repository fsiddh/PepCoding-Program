let fs = require("fs");
let path = require("path");

function getContent(dirPath){
    let contents = fs.lstatSync(dirPath);
    console.log(contents);
}

module.exports = {
    singleFileFn: getContent
}