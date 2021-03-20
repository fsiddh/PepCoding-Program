//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
//task -> get Bowlers name and wickets

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");

function printBirthdays(link,name,teamName){
    request(link,cb);
    function cb(error,response,html){
        if(error){
            console.log(error);
        }else{
            extractBday(name,teamName,html);
        }
    }
}

function extractBday(name,teamName,html){
    let selTool = cheerio.load(html);
    let bdayElem = selTool(".ciPlayerinformationtxt span"); 
    let bday = selTool(bdayElem[1]).text();
    console.log(name+" plays for "+teamName+" has birthday on "+bday);
}

request(url,cb); 
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) 
    }
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let teamNameElemArr = selectorTool(".Collapsible h5");
    let teamNameArr = [];

    //GETTING TEAMNAME
    for(let i=0;i<teamNameElemArr;i++){
        let teamName = selectorTool(teamNameElemArr[i]).text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        teamNameArr.push(teamName);
    }

    //GETTING BATSMAN TABLE
    let batsmantableArr = selectorTool(".table.batsman");
    for(let i=0;i<batsmantableArr.length;i++){
        //GETTING LINK
        let batsmanNameAnchor = selectorTool(batsmantableArr[i]).find("tbody tr .batsman-cell a"); 
        
        for(let j=0;j<batsmanNameAnchor.length;j++){
            let name = selectorTool(batsmantableArr[j]).text();           
            let teamName = teamNameArr[i];                               
            let link = selectorTool(batsmanNameAnchor[j]).attr("href"); 
            printBirthdays(link,name,teamName); 
        }
        
    }
}
