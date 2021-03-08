const fs = require("fs");

function updateLineBreaks(filePath){
    const data = fs.readFileSync(filePath, "UTF-8");
    // console.log(data);

    let updatedData = data.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    console.log(updatedData);    
}

// sFn("s_test.txt")

module.exports = {
    updateLineBreaksFn: updateLineBreaks
}