const helpfnObj = require("./commands/Utilities/help");
const viewfnObj = require("./commands/Utilities/view");
const organizefnObj = require("./commands/Utilities/organize");

let fs = require("fs");
let path = require("path");

let singleFileFnObj = require("./commands/singleFile");
const singleFile = require("./commands/singleFile");

let input = process.argv.slice(2);
// console.log(input);

let cmd = input[0];
// console.log(cmd);

switch(cmd){
    case "-s":

        break;
    case "-n":

        break;
    case "-b":

        break;
    default:
        if (cmd.length == 1){
            singleFileFnObj.singleFileFn(cmd);
        }
        else{
            continue;
        }
}





