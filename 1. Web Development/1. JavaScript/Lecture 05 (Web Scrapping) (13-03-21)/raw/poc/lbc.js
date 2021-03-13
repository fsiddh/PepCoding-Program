//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
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
    let selectorTool = cheerio.load(html);//loading html
    let allCommentries = selectorTool(".d-flex.match-comment-padder,align-items-center .match-comment-long-text");//selecting from required inspect 
    console.log(allCommentries.length);
    //rule -> jab bhi indexing krni ho you have to first wrap and then access text 
    let lastComment = selectorTool(allCommentries[2]).text(); 
    console.log(lastComment);//found the last comment
}

console.log("3");