//make package.js(biodata of project(like freeze>requirements.txt) -> "npm init -y"  
//install all dependencies                                         -> "npm install "
//install specific eg request module                               -> npm install request cheerio

const request = require("request");
console.log("1");
request("https://www.google.com",cb); 

function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        console.log(html);
    }
}
