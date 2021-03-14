const URL = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
const REQUEST = require("request");
const CHEERIO = require("cheerio");

console.log("1");
REQUEST(URL,cb);

function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) //console.log(html);
    }
}

function extractHtml(html){
    console.log("2");

    let selectorTool = CHEERIO.load(html);
    let bowling_table = selectorTool(".table.bowler");

    
    let max_wicket = -1;
    let highest_wicketer;
    for(let i = 0;i<bowling_table.length;i++){
        let singleInning = selectorTool(bowling_table[i]).find("tbody tr");
        for(let j=0;j<singleInning.length;j++){
            let singleAllcol = selectorTool(singleInning[j]).find("td");
            let name = selectorTool(singleAllcol[0]).text();
            let wicket = selectorTool(singleAllcol[4]).text();
            console.log("Name -> ",name,"wicket -> ",wicket);
            if (wicket > max_wicket){
                max_wicket = wicket;
                highest_wicketer = name;
            }
        }
        console.log("``````````````````````````````````");
    }

    console.log("Highest wickets were taken by->", highest_wicketer,"(",max_wicket,")");
        
    console.log("2");
}