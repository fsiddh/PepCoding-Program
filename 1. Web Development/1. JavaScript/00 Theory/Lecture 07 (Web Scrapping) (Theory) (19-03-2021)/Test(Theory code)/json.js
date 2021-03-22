let fs = require("fs");
let content = fs.readFileSync("abc.json");
// console.log(content+"");
// read -> parse
let json = JSON.parse(content);
json.push({
    "name": "ram",
    "lastName": "singh",
    "age": 25,
    "address": {
        "state": "Delhi",
        "city": "delhi"
    }
})
// JSon stringify
fs.writeFileSync("abc.json", JSON.stringify(json));
// console.log(json[1].name);
console.log("file written to disk");