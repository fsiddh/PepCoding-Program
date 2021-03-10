let input = ["-s", "-n", "filepath"]; //x3
// let input2 = ["-s", "filepath"];     x2
// let input = ["help"];                x1
// let input = [filepath"];             x1

let cmd = input[0];

switch (cmd) {
    case "-s":
        optionfnObj.optionFn(input);
        break;
    case "-n":
        optionfnObj.optionFn(input);
        break;
    case "-b":
        optionfnObj.optionFn(input);
        break;
    case "help":
        helpfnObj.helpfn();
        break;
    default:
        viewfnObj.viewfn(input);
}




function singBreak(input){
    let ans;

    if(input.length == 2){
        let filepath = input[1];
        let data = fs.readFileSync(filepath, 'utf8');

        data = data.replace(/\n\s*\n/g, '\n');
        ans = data;
    }
    else{
        let filepath = input[2];
        let data = fs.readFileSync(filepath, 'utf8');

        data = data.replace(/\n\s*\n/g, '\n');
        
        if(input[1] == '-n'){
            let ans = numberingAll(data);
        }
        else{
            let ans = numberingNonEmpty(data);
        }
    }
    return ans;
}

function numberingNonEmpty(s){
    let data = fs.readFileSync(filepath, "UTF-8");
    let lines = data.split(/\r?\n/);
    // console.log(lines);

    let count = 0;
    let ans = "";
    for(let i=0; i<lines.length; i++){
        let line = lines[i];
        
        if (line == ""){
            count++;
            ans += (count, ". ", line);
        }
        else{
            ans += (line);
        }
    }
}

function numberingAll(data){
    
    // console.log(lines);
    
    let count = 0;
    let ans = "";
    for(let i=0; i<data.length; i++){
        count+=1;
        ans += (count, ". ", data[i]);
    }
    
}