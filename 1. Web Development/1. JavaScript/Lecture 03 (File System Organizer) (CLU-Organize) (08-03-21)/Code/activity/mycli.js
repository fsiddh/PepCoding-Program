const viewfnObj = require("./commands/view");
const helpfnObj = require("./commands/help");
const organizefnObj = require("./commands/organize");

let input = process.argv.slice(2); 

let cmd = input[0];
switch (cmd) {
    case "view":
        viewfnObj.viewfn(input[1], input[2]);
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



