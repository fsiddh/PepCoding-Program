//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
let request = require("request");
let cheerio = require("cheerio");
console.log("Before");

request(url, cb);   // To get whole html of passed "url"
function cb(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        // console.log(html);
        extractHtml(html);
    }
}

function extractHtml(html) {
    let selTool = cheerio.load(html); // Extracts specific parts of html
    let matchCard = selTool(".col-md-8.col-16"); // Sare match cards pick krliye
    console.log(matchCard.length); 

    // For each match card we'll run the loop, and then extract link of that particular match.
    for (let i = 0; i < matchCard.length; i++) { 
        let cardBtns = selTool(matchCard[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let linkofMatch = selTool(cardBtns[2]).attr("href"); // "selTool(cardBtns[2])" is an "a" tag! usme se extract "href"
        let fullLink = "https://www.espncricinfo.com" + linkofMatch;
        // console.log(fullLink);
        getPlayerOfTheMatchname(fullLink);
    }
}

// Here we requests whole html data of fullLink we created for a match card
function getPlayerOfTheMatchname(fullLink) {
    // async fn
    request(fullLink, cb);
    function cb(err, res, html) {
        if (err) {
            console.log(err);
        } else {
            extractPlayer(html); // If no error occurs we call for further extraction
        }
    }
}

// Finally after getting the html data we try to get POTM
function extractPlayer(html) {
    let selTool = cheerio.load(html); // loads html for specific data extraction
   let playerDetails= selTool(".best-player-content").text(); // extracts POTM
   console.log(playerDetails) 
   
}