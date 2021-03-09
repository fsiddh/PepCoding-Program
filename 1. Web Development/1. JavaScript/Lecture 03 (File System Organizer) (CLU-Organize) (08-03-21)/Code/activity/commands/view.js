
let fs = require("fs"); 
let path = require("path"); 

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
    return fs.lstatSync(dirpath).isFile(); 
}                                     

function listContent(dirpath) {
    return fs.readdirSync(dirpath);
}                                   

function viewTree(dirpath, indent) {
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        
        console.log(indent+ path.basename(dirpath) + "*");
    } else {
        console.log(indent, path.basename(dirpath));
        let content = listContent(dirpath);

        for (let i = 0; i < content.length; i++) {
            
            let childPath = path.join(dirpath, content[i]);
            viewTree(childPath, indent + "\t");
        }
    }

}

function viewFlat(dirpath, toPrint) {
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        console.log(toPrint + "*");
    } else {
        console.log(toPrint);
        let content = listContent(dirpath);
        for (let i = 0; i < content.length; i++) {
            
            let childPath = path.join(dirpath, content[i]);

            viewFlat(childPath, toPrint + "\\" + content[i]);
        }
    }

}


module.exports = {
    viewfn: view
}

