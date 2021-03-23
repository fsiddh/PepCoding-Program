const fs = require("fs");
const path = require("path");
const json2xls = require("json2xls");


function readTeamContent(allBatsmenNameArr, teamName){

    for(let i=0; i<allBatsmenNameArr.length; i++){
        let batsmenNameArr = allBatsmenNameArr[i].split(" .json");
        console.log(batsmenNameArr);

        // for(let j=0; j<batsmenNameArr.length; j++){
        //     let file_path = path.join(__dirname, "ipl_2020", teamName, batsmenNameArr[j]);
        //     console.log(batsmenNameArr[j].split(".json"));
            // fs.readFile(file_path, 'utf8', function(err,body){
            //     var jsonData = JSON.parse(body);
            
            //     var xls = json2xls(jsonData);
            //     fs.writeFileSync(batsmenNameArr[j], xls, 'binary');
            // });
        // }
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
                // console.log(batsmenNameArr[0].split(" .json"));
            }
        })
    }
}

let dir_path = path.join(__dirname, "ipl_2020");
let directoryNameArr;
fs.readdir(dir_path, function(error, dirs){
    if(error){
        console.log("Unable to Scan dir_path!");
    }
    else{
        directoryNameArr = dirs;
        readDirContent(directoryNameArr);
        // console.log(typeof(dirs));
        // console.log(directoryNameArr);
    }
})

