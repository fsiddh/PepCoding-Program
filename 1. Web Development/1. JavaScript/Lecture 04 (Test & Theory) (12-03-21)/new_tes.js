let fs = require("fs");
let path = require("path");

// function copyFiletoFolder(dirpath, destFolder) {
//     let orgFileName = path.basename(dirpath);

//     console.log(orgFileName);

//     let destFilePath = path.join(destFolder, orgFileName);

//     fs.copyFileSync(dirpath, destFilePath);
// }

// copyFiletoFolder("C:\\Users\\DELL\\Downloads\\delt\\dev\03\\test.txt", "C:\\Users\\DELL\\Downloads\\delt\\dev");

let filename = path.basename("C:\\Users\\DELL\\Downloads\\delt\\dev\03\\test.txt");
let destfile = "C:\\Users\\DELL\\Downloads\\delt";
let x = path.join(destfile, filename);
console.log(x);