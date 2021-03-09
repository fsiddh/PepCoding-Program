let fs = require("fs"); 

function isFileorNOt(dirpath) {
    return fs.lstatSync(dirpath).isFile(); 
}   

function view(input){
    for(let i = 0;i<input.length;i++){
        if (!fs.existsSync(input[i])){
            console.log("File does not exist!!");
        }
        else{
            let isFile = isFileorNOt(input[i]);
            if (isFile == true) {
                console.log("Displaying File ",input[i]);
                let data = fs.readFileSync(input[i], 'utf8');
                console.log(data);
            }
        }
    }
}

module.exports = {
    viewfn: view
}

