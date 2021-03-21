//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
//task -> get Bowlers name and wickets

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");//used to select specific data from html

request(url,cb); 
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) //console.log(html);
    }
}

function extractHtml(html){
    let selectorTool = cheerio.load(html); 

    let bowling_table = selectorTool(".table.bowler"); 
    console.log(selectorTool(bowling_table[0]).html());

    let stringhtml = "";
    for(let i = 0;i<bowling_table.length;i++){
        stringhtml+=selectorTool(bowling_table[i]).html();
    }
    // console.log(stringhtml);
}

