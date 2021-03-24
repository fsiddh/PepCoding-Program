let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function createDir(dirpath){
    let dir = path.join(dirpath, "Organized Folder");
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    let m = path.join(dir, "media");
    let ap = path.join(dir, "apps");
    let d = path.join(dir, "docs");
    let o = path.join(dir, "archive");
    let ar = path.join(dir, "others");

    if (!fs.existsSync(m)){
        fs.mkdirSync(m);
    }
    if (!fs.existsSync(ap)){
        fs.mkdirSync(ap);
    }
    if (!fs.existsSync(d)){
        fs.mkdirSync(d);
    }
    if (!fs.existsSync(o)){
        fs.mkdirSync(o);
    }
    if (!fs.existsSync(ar)){
        fs.mkdirSync(ar);
    }
    console.log(dirpath);
    console.log(ar);

}

function isFileorNOt(dirpath) {
    return fs.lstatSync(dirpath).isFile(); 
}                                          

function listContent(dirpath) {
    return fs.readdirSync(dirpath); 
}                                   
   
function getDirectoryName(dirpath){
    let strArr = dirpath.split(".");
    let ext = strArr.pop();
    for(let key in types){
        for(let i=0; i<types[key].length; i++){
            if(ext in types[key]){
                return key;
            }
        }
    }
    return "others";
}

function copyFiletoFolder(dirpath, destFolder){
    let orgFileName = path.basename(dirpath);
    let destFilePath = path.join(destFolder, orgFileName);
    fs.copyFileSync(dirpath, destFilePath);
}

var count = 0
function organize(dirpath){
    let isFile = isFileorNOt(dirpath);
    if(isFile == true){
        let folderName = getDirectoryName(dirpath);
        count ++;
        console.log(dirpath, "->", folderName, " ", count);
        let destFolder = path.join()
    }
    else{
        let content = listContent(dirpath);
        for(let i=0; i<content.length; i++){
            let childPath = path.join(dirpath, content[i]);
            organize(childPath);
        }
    }
}

createDir("C:\\Users\\DELL\\Downloads");