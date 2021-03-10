function helper() {
    console.log(`List of all the commands
    1. "node wcat.js <filepath>" *displays content of the file in the terminal 
    2. "node wcat.js <filepath1> <filepath2> <filepath3>"... *displays content of all files in the terminal(contactinated form) in the given order.
    3. "node wcat.js -s <filepath>" *convert big line breaks into a singular line break
    4. "node wcat.js -n <filepath>" *give numbering to all the lines 
    5. "node wcat.js -b <filepath>" *give numbering to non-empty lines`);
}
module.exports = {
    helpfn: helper
}