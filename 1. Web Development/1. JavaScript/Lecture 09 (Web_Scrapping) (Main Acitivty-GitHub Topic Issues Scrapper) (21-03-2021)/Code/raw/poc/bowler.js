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
        extractHtml(html);
    }
}

function extractHtml(html){
    
    let selectorTool = cheerio.load(html); 

    let bowling_table = selectorTool(".table.bowler"); 

    for(let i = 0;i<bowling_table.length;i++){
        let singleInning = selectorTool(bowling_table[i]).find("tbody tr"); 
        for(let j=0;j<singleInning.length;j++){
            let singleAllcol = selectorTool(singleInning[j]).find("td"); 
            let name = selectorTool(singleAllcol[0]).text(); 
            let wicket = selectorTool(singleAllcol[4]).text(); 
            console.log("Name -> ",name,"wicket -> ",wicket);
        }
        console.log("``````````````````````````````````"); 
    }
}
