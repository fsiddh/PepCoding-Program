const fs = require("fs");
const path = require("path");

const fileFnObj = require("./commands/file");
const helpFnObj = require("./commands/help");

let input = process.argv.slice(2);
// console.log(input);

let cmd = input[0];

switch(cmd){
    case "-s":
        console.log("-s");
        break;
    case "-n":
        console.log("-n");
        break;
    case "-b":
        console.log("-b");
        break;
    case "help":
        helpFnObj.helpFn();
        break;
    default:
        if (input.length == 1){
            fileFnObj.fileFn(cmd);
        }
        else{
            for(let i=0; i<input.length; i++){
                fileFnObj.fileFn(input[i]);
            }
        }
}





