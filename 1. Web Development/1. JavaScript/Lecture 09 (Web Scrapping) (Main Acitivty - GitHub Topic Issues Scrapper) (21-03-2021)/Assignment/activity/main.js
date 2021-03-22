const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

function createDir(teamName){
    let folderPath = path.join(__dirname, teamName);

    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}

function createJSON(teamName, batsmenName){
    let filePath = path.join(__dirname, teamName, batsmenName + ".json");

    if(fs.existsSync(filePath) == false){
        let file = fs.createWriteStream(filePath);
        file.end();
    }
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

