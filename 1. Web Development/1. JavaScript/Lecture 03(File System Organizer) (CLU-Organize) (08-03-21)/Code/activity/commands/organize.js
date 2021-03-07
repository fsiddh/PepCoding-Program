//library
let fs = require("fs");
let path = require("path");

//object with info to group folders
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

//creating new folder -> mkdir,mkdirSync
//helper function that creates new directory
function dirCreator(dirpath){
    if(fs.existsSync(dirpath)==false){ // This checks if "organised_files" naam ka directory already exist krta hai or not
        fs.mkdirSync(dirpath); // If not creates a directory
    }
}

function isFileorNot(dirpath){
    //check extension
    return fs.lstatSync(dirpath).isFile();//from module fs an inbuilt function to check if sent path is file
}

function getContent(dirpath){//get dirpath into an array form
    //content
    return fs.readdirSync(dirpath);
}

function getDirectoryName(dirpath){
    //getting extension
    let strArr = dirpath.split(".");
    let ext = strArr.pop();
    //path.extname(dirpath);<-shortcut

    //matching ext with types
    for(let key in types){
        for(let i=0;i<types[key].length;i++){
            if(types[key][i]==ext){
                return key
            }
        }
    }
    //if no match 
    return "others";
}

// dirpath = "C:\Users\\DELL\Downloads\file.txt"
// destFolder = "C:\Users\\DELL\Downloads\organised_files\docs"
function copyFiletoFolder(dirpath, destFolder){ 
    let orgFileName = path.basename(dirpath); // get name of file from dirpath -> file.txt
    let destFilePath = path.join(destFolder, orgFileName); // destFilePath = "C:\Users\\DELL\Downloads\organised_files\docs\file.txt"
    fs.copyFileSync(dirpath,destFilePath); // fs.copyFileSync(p1, p2), this fn copies content of p1 file to p2
                                           // so it's neccessary for p2 also be a file at dest. locn.  
}

// ex.dirpath = "C:\Users\\DELL\Downloads"
// orgFilePath = "C:\Users\\DELL\Downloads\organised_files"
function OrganizeDir(dirpath, orgFilepath){

    console.log(orgFilepath,dirpath);
    let isFile = isFileorNot(dirpath)   // Returns true/false based on, if it's a file or not
    if(isFile == true){ // if file
        let folderName = getDirectoryName(dirpath);     //acc. to the file ext in dirpath,we get the resp. folder name
        
        console.log(path.basename(dirpath), "-> ",folderName); // ex. text.txt-> docs
        let destFolder = path.join(orgFilepath,folderName);    // destFolder = "C:\Users\\DELL\Downloads\organised_files" + "docs"
        copyFiletoFolder(dirpath,destFolder); 
    }
    else{ // loops through each folder/file and acc. operates through if else.
        let content = getContent(dirpath);  // Gets an array of all files & folder in "dirpath".
        for(let i=0;i<content.length;i++){
            let childPath = path.join(dirpath,content[i]);
            OrganizeDir(childPath);
        }
    }       
}

// creating organized_files folder in downloads
// dirpath = "C:\Users\\DELL\Downloads"
function organizeFn(dirpath){
    let orgFilePath = path.join(dirpath,"organized_files") // orgFilePath = "C:\Users\\DELL\Downloads" + "organised_files"
    dirCreator(orgFilePath);

    //creating subfolders with the name of key in object "types"
    for(let key in types){                             // In first iteration key = "media"
        let innerdirPath = path.join(orgFilePath,key); // Therefore, innerdirPath = "C:\Users\\DELL\Downloads\organised_files\media"
        dirCreator(innerdirPath);                      // finally, "media" directory'll be created
    }
    
    //others -> for remaining ext's
    let otherPath = path.join(orgFilePath,"others"); // Therefore, otherPath =  "C:\Users\\DELL\Downloads\organised_files\others"
    dirCreator(otherPath);
    
    OrganizeDir(dirpath);
}

module.exports = {
    organizeFn:organizeFn,
}



