const fs = require("fs");
const path = require("path");
let file_path = path.join(__dirname, "test.json");

let fileobj = fs.readFileSync(file_path, "UTF-8");

console.log(fileobj);
let obj = [{
    "name": "George"
}];

let data={...fileobj}
for(let i=0;i<2;i++){
    data.push(
        {
            name:`${i}sadfg`
        }
        )
    }
    
// console.log(fileobj);

fs.writeFileSync(file_path, JSON.stringify(data));