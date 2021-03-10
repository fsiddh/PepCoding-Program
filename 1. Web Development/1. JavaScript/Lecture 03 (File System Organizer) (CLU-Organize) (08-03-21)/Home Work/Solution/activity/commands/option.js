const fs = require("fs");
const helpfnObj = require("./help");

let optionChose = false;

function options(input,filepath) {
//input[0] -s ,input[1] -b ,....input[-1]-filepath
    let data = fs.readFileSync(filepath, 'utf8');
    for(let i=0; i<input.length-1; i++){
        if (optionChose == true && (input[i] == "-b" || input[i] == "-n")){
            return;
        }
        else if(input[i] == "-s"){
            console.log("------------------------(in -s)------------------------");
            data = singBreak(data);
        }
        else if(input[i] == "-n" && optionChose == false){
            console.log("------------------------(in -n)------------------------");

            optionChose = true;
            data = numberingAll(data);
        }
        else if(input[i] == "-b" && optionChose == false){
            console.log("------------------------(in -b)------------------------");

            optionChose = true;
            data = numberingNonEmpty(data);
        }
        else{
            if(input[i] != "-s"){
                console.log("Wrong Input ! Please choose any of these options only :\n");
                helpfnObj.helpfn(input);
                // console.log(optionChose);

                return;
            }
        }
    }
}

function singBreak(data){
    // console.log(typeof(data));
    // return;
    data = data.replace(/\n\s*\n/g, '\n\n');
    console.log(data);
    return data;
}

function numberingAll(data){
    const lines = data.split(/\r?\n/);
    // console.log(lines);
    
    let string_data = "";
    let count = 0;
    for(let i=0; i<lines.length; i++){
        count+=1;
        console.log(count, ". ", lines[i]);

        string_data += (count + ". " + lines[i] + "\n");
    }
    // console.log(string_data);
    return string_data;
}

function numberingNonEmpty(data){
    let lines = data.split(/\r?\n/);
    // console.log(lines);

    let string_data = "";
    let count = 0;
    for(let i=0; i<lines.length; i++){
        let line = lines[i];
        
        if (line == ""){
            count++;
            console.log(count, ". ", line);
            string_data += (count + ". " + line + "\n")
        }
        else{
            console.log(line);
            string_data += (line + "\n");
        }
    }

    return string_data;
}

module.exports = {
    optionFn:options,
}



