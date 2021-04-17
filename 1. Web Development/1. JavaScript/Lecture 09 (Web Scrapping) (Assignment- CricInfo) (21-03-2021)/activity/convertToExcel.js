const fs = require("fs");
const path = require("path");
const json2xls = require("json2xls");




function readTeamContent(allBatsmenNameArr, teamName){


    for(let i=0; i<allBatsmenNameArr.length; i++){
        let batsmenName = allBatsmenNameArr[i];
        // console.log(batsmenNameArr);
        // console.log("````````````````````````````````````````" + teamName + "`````````````````````````````````````");

        let file_path = path.join(__dirname, "ipl_2020", teamName, batsmenName);
        let batsmenNameWithoutJson = batsmenName.split(".")[0].trim();
        // console.log(batsmenName.split("."));
        // console.log(teamName + "->" + batsmenNameWithoutJson);

        fs.readFile(file_path, 'utf8', function(err,body){
            if(body != ""){
                var jsonData = JSON.parse(body);
            
                var xls = json2xls(jsonData);
                fs.writeFileSync(path.join(__dirname, "ipl_2020", teamName, batsmenNameWithoutJson + ".xlsx"), xls, 'binary');
            }
        });
    }
}

function readDirContent(directoryNameArr){
    for(let i=0; i<directoryNameArr.length; i++){
        let dirname = directoryNameArr[i];
        // console.log(dirname);

        let teamDir_path = path.join(__dirname, "ipl_2020", dirname);
        fs.readdir(teamDir_path, function(error, batsmenNameArr){
            if(error){
                console.log("Unable to Scan dir_path!");
            }
            else{
                readTeamContent(batsmenNameArr, dirname);
                // console.log(batsmenNameArr)
                // console.log(batsmenNameArr[0].split(" .json"));
            }
        })
    }
}

let dir_path = path.join(__dirname, "ipl_2020");
fs.readdir(dir_path, function(error, dirs){
    if(error){
        console.log("Unable to Scan dir_path!");
    }
    else{
        readDirContent(dirs);
        // console.log(typeof(dirs));
        // console.log(dirs);
    }
})

