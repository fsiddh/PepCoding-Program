const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const iplFolderName = "ipl_2020";

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

function iplDir(){
    let folderPath = path.join(__dirname, iplFolderName);

    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}

function createDir(teamName){
    let folderPath = path.join(__dirname, iplFolderName, teamName);

    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}

function createJSON(teamName, batsmenName){
    let filePath = path.join(__dirname, iplFolderName, teamName, batsmenName + ".json");

    if(fs.existsSync(filePath) == false){
        let file = fs.createWriteStream(filePath);
        file.end();
    }
}

function fillJsonWithStats(batsmanTeam, opponentTeam, batsmanName, currentTeam_batsmenRow, selTool){
    let objArr = [];
    
    let batsmanRow = selTool(currentTeam_batsmenRow).find("td");
    // console.log(batsmanRow.length);

    let opponentName = opponentTeam;
    let runs = selTool(batsmanRow[2]).text();
    let balls = selTool(batsmanRow[3]).text();
    let fours = selTool(batsmanRow[5]).text();
    let sixes = selTool(batsmanRow[6]).text();
    let sr = selTool(batsmanRow[7]).text();

    let description = selTool(".match-info.match-info-MATCH .description").text().split(",");
    let date = description[2];
    let venue = description[1];
    // console.log(description);

    let result = selTool(".match-info.match-info-MATCH .status-text").text();

    let obj = {
        "opponentName": opponentName,
        "runs": runs,
        "balls": balls,
        "fours": fours,
        "sixes": sixes,
        "sr": sr,
        "date": date,
        "venue": venue,
        "result": result
    }
    objArr.push(obj);

    let file_path = path.join(__dirname, iplFolderName, batsmanTeam, batsmanName + ".json");
    fs.writeFileSync(file_path, JSON.stringify(objArr));
}

function gotMatchLinkHTML(html){
    let selTool = cheerio.load(html);

    let bothTeams = selTool(".name-link .name");
    let team1_Name = selTool(bothTeams[0]).text();
    let team2_Name = selTool(bothTeams[1]).text();

    // console.log("Team 1: ", team1_Name);
    // console.log("Team 2: ", team2_Name);

    createDir(team1_Name);
    createDir(team2_Name);

    let batsmenContainer = selTool(".table.batsman"); // get both team batsmen tables
    for(let i=0; i<batsmenContainer.length; i++){
        let currentTeam_batsmen = selTool(batsmenContainer[i]).find("tbody tr"); // for every table get all batsmeen data
        
        for(let j=0; j<currentTeam_batsmen.length-1; j+=2){ // get relevant batsmen row
            let batsmenAnchor = selTool(currentTeam_batsmen[j]).find("a");
            
            let batsmanName = selTool(batsmenAnchor).text().trim();
            // let batsmenLink = selTool(batsmenAnchor).attr("href");

            createJSON(selTool(bothTeams[i]).text(), batsmanName);

            if(i == 0){
                fillJsonWithStats(selTool(bothTeams[i]).text(), selTool(bothTeams[1]).text(), batsmanName, currentTeam_batsmen[j], selTool);
            }
            else{
                fillJsonWithStats(selTool(bothTeams[i]).text(), selTool(bothTeams[0]).text(), batsmanName, currentTeam_batsmen[j], selTool);
            }
        }
    }
}

function getMatchLinkHTML(fullLink){
    request(fullLink, function(err, response, html){
        if(err){
            console.log(err);
        }
        else{
            gotMatchLinkHTML(html);
        }
    })
}

function getAllMatches(html){
    let selTool = cheerio.load(html);
    let allMatches = selTool(".match-info-link-FIXTURES"); // anchor tag of all matches( ie 60!)

    iplDir();

    for(let i=0; i<allMatches.length; i++){
        let matchLink = selTool(allMatches[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + matchLink;

        // console.log(fullLink);
        getMatchLinkHTML(fullLink);
    }
}

request(url, function(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        getAllMatches(html);
    }
})

