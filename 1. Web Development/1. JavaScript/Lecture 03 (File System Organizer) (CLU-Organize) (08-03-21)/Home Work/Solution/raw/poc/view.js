// file , folder 
let fs = require("fs"); // recieves 'fs' module from node.js
let path = require("path"); // recieves 'path' module from node.js

//let content = fs.readFileSync("gtree.js");  <-This code gets the entire code/data present in gtree.js file
//console.log("content is "+content);
// viewFlat 
// nodejs 
function view(dirname, mode) {


    if (mode == "tree") {
        viewTree(dirname, "");
    } else if (mode == "flat") {
        viewFlat(dirname, "");
        console.log("flat view implemented");
    } else {
        console.log("Wrong mode");
    }
}

function isFileorNOt(dirpath) {
    return fs.lstatSync(dirpath).isFile(); // "lstatSync(dirpath).isFile()" tells whether dirpath is of
}                                          // a file or not.

function listContent(dirpath) {
    return fs.readdirSync(dirpath); // "fs.readdirSync(dirpath)" gets the contents(folders and files) of the dirpath.
}                                   // mtlb dirpath wali jage jitne bhi files or folders hai unki
                                    // list dedega Array ke form me

function viewTree(dirpath, indent) {
    // console.log(dirpath);
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        // let strArr = dirpath.split("\\");
        // let toPrint = strArr.pop();
        console.log(indent+ path.basename(dirpath) + "*");
    } else {
        // let strArr = dirpath.split("\\");
        // let toPrint = strArr.pop();
        console.log(indent, path.basename(dirpath));
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            // f10/f1.txt
            // let childPath = dirpath + "\\" + content[i];
            let childPath = path.join(dirpath, content[i]);
            viewTree(childPath, indent + "\t");
        }
    }

}

function viewFlat(dirpath, toPrint) {
    // console.log(dirpath);
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        console.log(toPrint + "*");
    } else {
        console.log(toPrint);
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            // f10/f1.txt
            let childPath = path.join(dirpath, content[i]);

            viewFlat(childPath, toPrint + "\\" + content[i]);
        }
    }

}

module.exports = {
    viewfn: view
}

// "C:\Users\Ritik Singh\Desktop\Batches\PP-Batch-1\2_file_system_06_03_2021\raw\poc\f10"
// let input = process.argv.slice(2);
// let strArr = input[0].split("\\");
// let toprint = strArr.pop();
// viewFlat(input[0], toprint);
// viewTree(input[0], "");
// lstastync , readdir,readfile 

// console.log(listContent("C:\Program Files"));

