const request = require("request");

console.log("after");
request("https://www.google.com",cb);

function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        console.log(html);
    }
}
console.log("before");