//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
//task -> get Bowlers name and wickets

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");//used to select specific data from html

request(url,cb); //request url from server
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) //console.log(html);
    }
}

function extractHtml(html){
    //GETTING CONTENTS FROM PAGE
    let selectorTool = cheerio.load(html); //loading html

    //Step1. GETTING BOWLER TABLE
    /* We found in inspect class - "table bowler". In html the class should be selected as .table.bowler(space->.)
        if .table bowler -> means search for "table" class and in its children search for "bowler" class
        if .table.bowler -> search for class "table bowler"
    */
    let bowling_table = selectorTool(".table.bowler"); //selecting from required inspect
    
    // GETTING STRUCTURE OF TABLE
    // let stringhtml = "";
    // for(let i = 0;i<bowling_table.length;i++){
    //     stringhtml+=selectorTool(bowling_table[i]).html();
    // }
    // console.log(stringhtml);

    //Step2. GETTING TABLES' DATA OF BOTH THE INNING
    let hwkt=0; //highest wicket tacker
    let hwtname = ""; //highest wicket tacker name
    for(let i = 0;i<bowling_table.length;i++){
        let singleInning = selectorTool(bowling_table[i]).find("tbody tr"); // gets 1st Innings bowling table's rows
        for(let j=0;j<singleInning.length;j++){
            let singleAllcol = selectorTool(singleInning[j]).find("td"); // get columns of each row
            let name = selectorTool(singleAllcol[0]).text(); //name was in 1st column
            let wicket = selectorTool(singleAllcol[4]).text(); //wicket was in 4th column
            console.log("Name -> ",name,"wicket -> ",wicket);
            if(hwkt < Number.parseInt(wicket)){ //finding the highest wicket and player name
                hwkt = wicket;
                hwtname = name;
            }
        }
        console.log("``````````````````````````````````"); // This line indicates Inning 1 is Over!
    }

    console.log("Highest wicket taking bowler is : ",hwtname," : ",hwkt);
}

