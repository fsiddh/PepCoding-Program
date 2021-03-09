let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function dirCreator(dirpath){
    if(fs.existsSync(dirpath)==false){ 
        fs.mkdirSync(dirpath);
    }
}

function isFileorNot(dirpath){
    return fs.lstatSync(dirpath).isFile();
}

function getContent(dirpath){
    return fs.readdirSync(dirpath);
}

function getDirectoryName(dirpath){
    
    let strArr = dirpath.split(".");
    let ext = strArr.pop();
    
    for(let key in types){
        for(let i=0;i<types[key].length;i++){
            if(types[key][i]==ext){
                return key
            }
        }
    }
    return "others";
}


function copyFiletoFolder(dirpath, destFolder){ 
    let orgFileName = path.basename(dirpath); 
    let destFilePath = path.join(destFolder, orgFileName);  
    
    fs.copyFileSync(dirpath,destFilePath);  
}

function OrganizeDir(dirpath, x){
    let isFile = isFileorNot(dirpath)   
    if(isFile == true){ 
        let folderName = getDirectoryName(dirpath);    
        
        console.log(path.basename(dirpath), "-> ",folderName); 
        let destFolder = path.join(x,folderName);   
        copyFiletoFolder(dirpath,destFolder); 
    }
    else{ 
        let content = getContent(dirpath);  
        for(let i=0;i<content.length;i++){
            let childPath = path.join(dirpath,content[i]);
            OrganizeDir(childPath, x);
        }
    }       
}


function organizeFn(dirpath){
    let orgFilePath = path.join(dirpath,"organized_files") 
    dirCreator(orgFilePath);
    
    for(let key in types){                            
        let innerdirPath = path.join(orgFilePath,key); 
        dirCreator(innerdirPath);                      
    }
    
    let otherPath = path.join(orgFilePath,"others"); 
    dirCreator(otherPath);

    OrganizeDir(dirpath,orgFilePath);
}

module.exports = {
    organizeFn:organizeFn,
}



