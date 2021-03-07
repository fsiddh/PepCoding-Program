const viewfnObj = require("./commands/view");
const helpfnObj = require("./commands/help");
const organizefnObj = require("./commands/organize");

let input = process.argv.slice(2); // ex. input = {"view", "C:\Users\\DELL\Downloads", "tree"}

let cmd = input[0] // So in "input" we'll get "view"
switch (cmd) {
    case "view":
        viewfnObj.viewfn(input[1], input[2])
        break;

    case "organize":
        organizefnObj.organizeFn(input[1]);
        break;

    case "help":
        helpfnObj.helpfn();
        break;

    default:
        console.log("Wrong command! \nType help to see the list of all the commands.");
}



