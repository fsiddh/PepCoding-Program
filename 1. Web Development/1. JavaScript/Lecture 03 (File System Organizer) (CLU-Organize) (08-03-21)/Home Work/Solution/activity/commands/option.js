let fs = require("fs");

function options(mode,filepath) {
    if (mode == "-s") {
        singBreak(filepath);
    } else if (mode == "-n") {
        numberingAll(filepath);
    } else if (mode == "-b"){
        numberingNonEmpty(filepath);
    }
}

function singBreak(filepath){
    let data = fs.readFileSync(filepath, 'utf8');
    data=data.replace(/\n\s*\n/g, '\n');
    console.log(data);
}

function numberingAll(filepath){
    const data = fs.readFileSync(filepath, "UTF-8");
    const lines = data.split(/\r?\n/);
    
    // console.log(lines);
    
    let count = 0;
    for(let i=0; i<lines.length; i++){
        count+=1;
        console.log(count, ". ", lines[i]);
    }
    
}

function numberingNonEmpty(filepath){
    let data = fs.readFileSync(filepath, "UTF-8");
    let lines = data.split(/\r?\n/);
    // console.log(lines);

    let count = 0;
    for(let i=0; i<lines.length; i++){
        let line = lines[i];
        
        if (line == ""){
            count++;
            console.log(count, ". ", line);
        }
        else{
            console.log(line);
        }
    }
}

module.exports = {
    optionFn:options,
}



