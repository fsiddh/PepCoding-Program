//make package.js -> npm init -y
//install -> npm install
//install specific eg request module -> npm install request cheerio

let request = require("request");
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

//output -> 1,2,html -> jo ple kam hskta vo ple hga  bad me cb lgega



