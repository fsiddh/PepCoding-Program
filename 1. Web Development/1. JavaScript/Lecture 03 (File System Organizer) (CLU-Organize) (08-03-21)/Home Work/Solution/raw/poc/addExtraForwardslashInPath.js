// addExtraForwardslashInPath
// testFilePath = "D:\Work\Github Repositories\PepCoding-Program\1. Web Development\1. JavaScript\Lecture 03 (File System Organizer) (CLU-Organize) (08-03-21)\Home Work\Solution\activity\commands\Utilities\n_test.txt"
const path = require("path");

function test(filePath){
    let ans = path.join(filePath);
    console.log(ans);
}

test("D:\Work\Github Repositories\PepCoding-Program\1. Web Development\1. JavaScript\Lecture 03 (File System Organizer) (CLU-Organize) (08-03-21)\Home Work\Solution\activity\commands\Utilities\n_test.txt")