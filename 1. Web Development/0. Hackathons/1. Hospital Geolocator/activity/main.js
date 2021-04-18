const puppeeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const hospitalFnObj = require("./Utilities/hospital.js");
const gMapsFnObj = require("./Utilities/gmaps.js")
const gmailsendFnObj = require("./Utilities/sendMail.js")

let recieverEmail = process.argv[2];

function infoDir(){
    let folderPath = path.join(__dirname, "Utilities", "Information");

    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}

(async function () {
    try {
        // Create Information Directory
        infoDir();

        // Launch Browser
		let browserRef = await puppeeteer.launch({
			headless: false,
			defaultViewport: null,
			args: ["--start-maximized"],
        });
        
        // Extract Information on nearby Hospital 
        let hospital_details_ObjArr = await hospitalFnObj.hospitalFn(browserRef);
        console.log("````````````````````Hospital fn Executed````````````````````");
        // console.log(hospital_details_ObjArr);
        // console.table(hospital_details_ObjArr);
        
        // // Extract nearby Hospital route details
        let gMaps_info_ObjArr = await gMapsFnObj.gMapsFn(browserRef, hospital_details_ObjArr);
        console.log("````````````````````GMAPs fn Executed````````````````````");
        // console.log(gMaps_info_ObjArr);
        // console.table(gMaps_info_ObjArr);
        
        // // Send Mail
        let mesg = await gmailsendFnObj.gmailsendFn(recieverEmail);
        console.log(mesg);

        // browserRef.close();
	} catch (error) {
		console.log(error);
	}
})();
