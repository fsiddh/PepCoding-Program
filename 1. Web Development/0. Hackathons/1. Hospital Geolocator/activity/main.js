const puppeeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const hospitalFnObj = require("./Utilities/hospital.js");
const gMapsFnObj = require("./Utilities/gmaps.js")
const mailFnObj = require("./Utilities/mail.js")
const { email, password } = require("../auth_details.js");

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
        let hospital_detailsObj = await hospitalFnObj.hospitalFn(browserRef);
        console.table(hospital_detailsObj);

        // Extract nearby Hospital route details
        // let gMaps_link = await gMapsFnObj.gMapsFn(browserRef, hospital_detailsArr.Name);
        let gMaps_infoObj = await gMapsFnObj.gMapsFn(browserRef, hospital_detailsObj.Name, hospital_detailsObj.Address);
        console.log(gMaps_infoObj);

        // Send Mail
        // let temp_recieverEmail = "jasonshaw546@gmail.com"
        await mailFnObj.mailFn(browserRef, recieverEmail);

        browserRef.close();
	} catch (error) {
		console.log(error);
	}
})();
