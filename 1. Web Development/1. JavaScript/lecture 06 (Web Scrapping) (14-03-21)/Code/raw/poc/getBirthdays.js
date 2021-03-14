//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
//task -> get Bowlers name and wickets

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");//used to select specific data from html

//link -> "https://www.espncricinfo.com/ci/content/player/325012.html"
//name -> Marcus Stoinis
//teamName -> Delhi Capitals
function printBirthdays(link,name,teamName){
    request(link,cb);
    function cb(error,response,html){
        if(error){
            console.log(error);
        }else{
            extractBday(name,teamName,html); //console.log(html);
        }
    }
}

function extractBday(name,teamName,html){
    let selTool = cheerio.load(html);
    let bdayElem = selTool(".ciPlayerinformationtxt span"); // Inspect me yha pr bdays hai
    // bdayElem me sare class span vale agae. usme dekha ki 0th span me name of player h 1st span player ka bday de rkha
    let bday = selTool(bdayElem[1]).text();
    console.log(name+" plays for "+teamName+" has birthday on "+bday);
}


request(url,cb); //request url from server
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) //console.log(html);
    }
}

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

    let batsmantableArr = selectorTool(".table.batsman");
    for(let i=0;i<batsmantableArr.length;i++){
        
        let batsmanNameAnchor = selectorTool(batsmantableArr[i]).find("tbody tr .batsman-cell a"); //anchor tag me next page ki link h vha pauch gye
        // batsmanNameAnchor -> <a href="https://www.espncricinfo.com/ci/content/player/325012.html" data-hover="" class="small" target="_parent" rel="" title="View full profile of Marcus Stoinis">Marcus Stoinis&nbsp;</a>;
        for(let j=0;j<batsmanNameAnchor.length;j++){
            let name = selectorTool(batsmantableArr[j]).text();
            let teamName = teamNameArr[i];
            let link = selectorTool(batsmanNameAnchor[j]).attr("href"); //anchor tag -> href se link nikal li using attr() -> "https://www.espncricinfo.com/ci/content/player/325012.html"
            printBirthdays(link,name,teamName); 
            //link -> "https://www.espncricinfo.com/ci/content/player/325012.html"
            //name -> Marcus Stoinis
            //teamName -> Delhi Capitals
        }
        
        //console.log("````````````````````````````````````````````````");
    }
}


// let t = ah.getAttribute('a href');
// console.log(t);