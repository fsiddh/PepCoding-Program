//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
//task -> get Bowlers name and wickets

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");

request(url,cb); 
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) 
    }
}

//===========================================================METHOD-1=================================================================================
function extractHtml(html){

    let selectorTool = cheerio.load(html);
    let teamName= selectorTool(".header-title.label");   
    let batsmenTable = selectorTool(".table.batsman") 

    let k=0;
    for(let i = 0;i<batsmenTable.length;i++){
        let singleInning = selectorTool(batsmenTable[i]).find("tbody tr"); 
        let tName = selectorTool(teamName[k]).text(); 
        tName = tName.split("INNINGS")[0]; 
        tName.trim();
        for(let j=0;j<singleInning.length;j++){
            let allCol = selectorTool(singleInning[j]).find("td");
            if(allCol.length == 8){ 
                let name = selectorTool(allCol[0]).text(); 
                console.log(name+" of "+tName);
            }
        }
        console.log("``````````````````````````````````````````````````````"); 
        k++;
    }
}

/*
===========================================================METHOD-2=================================================================================
function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let teamNameElemArr = selectorTool(".Collapsible h5");
    let teamNameArr = [];
    for(let i=0;i<teamNameElemArr;i++){
        let teamName = selectorTool(teamNameElemArr[i]).text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        teamNameArr.push(teamName);
    }

    let batsmantableArr = selectorTool("table.batsman");

    for(let i=0;i<batsmantableArr.length;i++){
        let batsmanName = selectorTool(batsmantableArr[i]).find("tbody tr .batsman-cell");

        for(let j=0;j<batsmanName.length;j++){
            let name = selectorTool(batsmanName[j]).text();
            console.log(name+" of "+teamNameArr[i]);
        }
        console.log("````````````````````````````````````````````````");
    }
}
*/

