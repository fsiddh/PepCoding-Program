const fs = require("fs");
const path = require("path");

function lineCount(filePath){
    const data = fs.readFileSync(filePath, "UTF-8");
    const lines = data.split(/\r?\n/);
    
    // console.log(lines);
    
    let count = 0;
    for(let i=0; i<lines.length; i++){
        count+=1;
        console.log(count, ". ", lines[i]);
    }
    
}

// lineCount("C:\\Users\\DELL\\Downloads\\hhhh.txt");

module.exports = {
    lineCountFn: lineCount
}