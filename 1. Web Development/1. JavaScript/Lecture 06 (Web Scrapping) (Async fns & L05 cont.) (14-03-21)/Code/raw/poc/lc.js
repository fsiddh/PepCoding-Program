//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary
// task -> get the latest commentry 

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
const request = require("request");
const cheerio = require("cheerio");

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
    let allCommentries = selectorTool(".d-flex.match-comment-padder,align-items-center .match-comment-long-text");
    console.log(allCommentries.length);
    
    let lastComment = selectorTool(allCommentries[0]).text(); 
    console.log(lastComment);
}

