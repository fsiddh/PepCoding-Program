const path = require("path");
const fs = require("fs");

function noLinenoCount(filePath){
    let data = fs.readFileSync(filePath, "UTF-8");
    let lines = data.split(/\r?\n/);
    // console.log(lines);

    let count = 0;
    for(let i=0; i<lines.length; i++){
        let line = lines[i];
        
        if (line == ""){
            count++;
            console.log(count, ". ", line);
        }
        else{
            console.log(line);
        }
    }
}

module.exports ={
    noLinenoCountFn: noLinenoCount
}
// noLinenoCount("D:\\Work\\Github Repositories\\PepCoding-Program\\1. Web Development\\1. JavaScript\\Lecture 03 (File System Organizer) (CLU-Organize) (08-03-21)\\Home Work\\Solution\\activity\\commands\\Utilities\\n_test.txt");