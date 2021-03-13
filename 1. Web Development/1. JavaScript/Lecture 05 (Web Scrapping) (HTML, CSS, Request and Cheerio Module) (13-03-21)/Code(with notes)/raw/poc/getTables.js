//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");//used to slect specific data from html

console.log("1");
request(url,cb);

function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) //console.log(html);
    }
}

function extractHtml(html){
    console.log("2");
    //getting content from page
    let selectorTool = cheerio.load(html);//loading html

    //getting bowler table
    let bowling_table = selectorTool(".table.bowler");//selecting from required inspect
    let stringhtml = "";

    // for(let i = 0;i<bowling_table.length;i++){
    //     stringhtml+=selectorTool(bowling_table[i]).html();
    // }
    // console.log(stringhtml);

    for(let i = 0;i<bowling_table.length;i++){
        let singleInning = selectorTool(bowling_table[i]).find("tbody tr"); // get table rows
        for(let j=0;j<singleInning.length;j++){
            let singleAllcol = selectorTool(singleInning[j]).find("td"); // get columns of each row
            let name = selectorTool(singleAllcol[0]).text(); //name was in 1st column
            let wicket = selectorTool(singleAllcol[4]).text(); //wicket was in 4th column
            console.log("Name -> ",name,"wicket -> ",wicket);
        }
        console.log("``````````````````````````````````");
    }
}

console.log("3");