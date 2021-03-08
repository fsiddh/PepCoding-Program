const fs = require("fs");
const path = require("path");

const fileFnObj = require("./commands/file");
const helpFnObj = require("./commands/help");
const lineCountFnObj = require("./commands/n");
const noLineNoCountFnObj = require("./commands/b");

let input = process.argv.slice(2);
// console.log(input);

let cmd = input[0];

switch(cmd){
    case "-s":
        console.log("-s");
        break;
    case "-n":
        lineCountFnObj.lineCountFn(input[1]);
        break;
    case "-b":
        noLineNoCountFnObj.noLinenoCountFn(input[1]);
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





