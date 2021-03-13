//make package.js(This file will contain biodata of this project just like freeze>requirements.txt) ->
//"npm init -y"
//install -> "npm install "
//install specific eg request module -> npm install request cheerio

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
console.log("2");

//output -> 1,2,html -> jo ple kam hskta vo ple hga bad me cb lgega
// as cb asynchronously chalega, because request is a async function!

//INFO(Sync vs ASync):
// When you execute something synchronously, you wait for it to finish before moving on to another task.
// When you execute something asynchronously, you can move on to another task before it finishes.



