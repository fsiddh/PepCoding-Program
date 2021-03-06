// view
// tree
// flat
// organize
// help
let input = process.argv.slice(2);
// console.log(input);
// console.log(input);
let cmd = input[0]
switch (cmd) {
    case "view":
        //view as tree
        // view as flat 
        // recursion
        view(input[1], input[2]);
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
