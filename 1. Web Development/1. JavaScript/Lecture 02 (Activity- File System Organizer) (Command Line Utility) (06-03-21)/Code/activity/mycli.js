// view
    // tree
    // flat
// organize
// help

let input = process.argv.slice(2); // Jab apn input dalnge (eg."node mycli.js help")to apne input
                                   // var me after mycli.js sare words aa jaenge .

let cmd = input[0] // based on our command we'll get view/organize/help
switch (cmd) { // acc. to the cmd we'll enter the case
    case "view":
        //view as tree
        // view as flat 
        // recursion
        view(input[1], input[2]); //whatever be the input tree or flat, view fn() will
                                  // get called and then acc. it'll get executed
        break;
    case "organize":
        console.log("organize command executed");
        break;
    case "help":
        console.log(`List of all the commands
                    1. node mycli.js view <dirname> tree
                    2. node mycli.js view <dirname> flat
                    3. node mycli.js organize <dirname>
                    4. node mycli.js help`);
        break;

    default:
        console.log("Wrong command . Type help to see the list of all the commands");
}

// Upon entering "view" cmd flat or tree will get passed here 
// and their resp. condition will get executed.
function view(dirname, mode) {


    if (mode == "tree") {
        console.log("tree implemented");
    } else if (mode == "flat") {
        viewFlat(path);
        console.log("flat view implemented");
    } else {
        console.log("Wrong mode");
    }
}

function viewFlat(dirPath) {

}
