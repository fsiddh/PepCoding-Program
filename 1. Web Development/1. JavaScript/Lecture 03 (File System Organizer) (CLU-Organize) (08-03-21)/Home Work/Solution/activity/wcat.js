const fs = require("fs");
const path = require("path");

const helpfnObj = require("./commands/help");
const optionfnObj = require("./commands/option");
const viewfnObj = require("./commands/view");



let input = process.argv.slice(2); 
let filepath = input[input.length-1];

function isFile(dirpath){
    return (dirpath!=path.basename(dirpath));
}

//input[0]-filepath
if(input.length==1){
    viewfnObj.viewfn(input);
}
else if (input.length>1){
    //1.input[0]-filepath input[-1]-filepath
    let isFilebool = isFile(input[0]);
    if(isFilebool==true){
        viewfnObj.viewfn(input);
    }
    else{
    //2.input[0]-option input[-1]-filepath
        if(!fs.existsSync(filepath)){
            console.log("File does not exist!!");
        }
        else{
            optionfnObj.optionFn(input,filepath);
        }
    }
}


