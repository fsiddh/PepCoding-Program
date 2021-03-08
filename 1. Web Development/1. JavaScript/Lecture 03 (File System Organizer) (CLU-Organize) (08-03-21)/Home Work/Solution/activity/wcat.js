let fs = require("fs");
let path = require("path");

let fileFnObj = require("./commands/file");

let input = process.argv.slice(2);
// console.log(input);

let cmd = input[0];

switch(cmd){
    case "-s":
        break;
    case "-n":

        break;
    case "-b":

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





