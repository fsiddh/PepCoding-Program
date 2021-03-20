let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
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

function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let matchCard = selectorTool(".col-md-8.col-16");

    for(let i=0; i<matchCard.length; i++){
        let cardsButtons = selectorTool(matchCard[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let linkMatch = selectorTool(cardsButtons[2]).attr("href");
        // console.log(linkMatch);

        let fullLink = "https://www.espncricinfo.com" + linkMatch;
        // console.log(fullLink);

        printPOTM(fullLink, cardsButtons.length, 0);
    }
}

function printPOTM(fullLink, len, n){
    if (len == n){
        return;
    }

    request(fullLink, function (error,response,fullLink){
        if(error){
            console.log(error);
        }else{
            extractPOTM(fullLink);
            printPOTM(fullLink, len, n+1);
        }
    }
}


function extractPOTM(fullLink){
    let selectorTool = cheerio.load(fullLink);
    let potm_name = selectorTool(".best-player-content").text();
    console.log(potm_name);
}