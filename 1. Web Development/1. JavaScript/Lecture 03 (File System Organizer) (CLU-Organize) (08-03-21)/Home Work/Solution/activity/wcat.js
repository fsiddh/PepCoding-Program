const fs = require("fs");
const path = require("path");

const helpfnObj = require("./commands/help");
const optionfnObj = require("./commands/option");
const viewfnObj = require("./commands/view");

let input = process.argv.slice(2);
// console.log(input);

let cmd = input[0];

switch (cmd) {
    case "-s":
        if (!fs.existsSync(input[1])){
            console.log("File does not exist!!");
            break;
        }
        optionfnObj.optionFn(cmd,input[1]);
        break;
    case "-n":
        if (!fs.existsSync(input[1])){
            console.log("File does not exist!!");
            break;
        }
        optionfnObj.optionFn(cmd,input[1]);
        break;
    case "-b":
        if (!fs.existsSync(input[1])){
            console.log("File does not exist!!");
        }
        optionfnObj.optionFn(cmd,input[1]);
        break;
    case "help":
        helpfnObj.helpfn();
        break;
    default:
        viewfnObj.viewfn(input);
}




