//make package.js(biodata of project(like freeze>requirements.txt) -> "npm init -y"  
//install all dependencies                                         -> "npm install "
//install specific eg request module                               ->  npm install request cheerio

const request = require("request");
console.log("before");
request("https://www.google.com",cb);  //request url from server

function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        console.log(html);
    }
}
console.log("after");

//output -> 1,2,html -> jo ple kam hskta vo ple hga bad me cb lgega
// as cb asynchronously chalega, because request is a async function!

//INFO(Sync vs ASync):
// When you execute something synchronously, you wait for it to finish before moving on to another task.
// When you execute something asynchronously, you can move on to another task before it finishes.
