const URL = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
const REQUEST = require("request");
const CHEERIO = require("cheerio");

console.log("before");
REQUEST(URL,cb); // request if an async function and it'll also pass html to cb()

function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) //console.log(html);
    }
}

function extractHtml(html){

    let selectorTool = CHEERIO.load(html);
    let teamNameElemArr = selectorTool(".Collapsible h5"); // gets both teams batsmen table
    let teamNameArr = [];

    // Gets both teams name
    for(let i=0; i<teamNameElemArr.length; i++){
        let teamName = selectorTool(teamNameElemArr[i]).text();

        teamName = teamName.split("INNINGS")[0]; // teamName = ["team_name ", " (20 overs maximum)"]
        teamName = teamName.trim(); // After getting an array of strings we'll get extra space, to remove that space, use trim()
        teamNameArr.push(teamName); // teamName = ["player", "(20 overs maximum)"]
    }
    
    let batsmanTableArr = selectorTool(".table.batsman"); // selects batsmen tables
    for(let i=0; i<batsmanTableArr.length; i++){ 
        let batsmanName = selectorTool(batsmanTableArr[i]).find("tbody tr .batsman-cell"); // gets all the rows(ie stats of every batsmen)

        for(let j=0; j<batsmanName.length; j++){ // then one by one select text of each row(ie playername) and print
            let name = selectorTool(batsmanName[j]).text();
            console.log(name+"-> "+teamNameArr[i]);
        }
        console.log("``````````````````````````````````````");
    }
    
}
console.log("after");