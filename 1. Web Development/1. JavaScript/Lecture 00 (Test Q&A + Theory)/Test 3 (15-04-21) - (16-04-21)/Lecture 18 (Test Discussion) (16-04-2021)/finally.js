let fn = () => {
    try {
        console.log("Hello");
    }
    catch (err) {
        console.log("error");
    }
    finally {
        console.log("I will run");
        // return 10;
    }
   
}
let rVal = fn();
console.log(rVal);