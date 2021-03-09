let fs = require("fs");
let path = require("path");

function getContent(dirPath){
    let contents = fs.readFileSync(dirPath, "utf-8");
    console.log(contents);
    console.log("------------------------------------------------------------------------------------");
}

// getContent("D:\\Work\\Github Repositories\\PepCoding-Program\\1. Web Development\\1. JavaScript\\Lecture 03 (File System Organizer) (CLU-Organize) (08-03-21)\\Home Work\\Solution\\activity\\s_test.txt");

module.exports = {
    fileFn: getContent
}