const path = require("path");
const authObj = require("../../auth_details.js");

const googleMaps_link = "https://www.google.com/maps";
const informationDirName = "Information";

// waits -> takes screeenshot and saves it
async function takeSS(fileName) {
    await gmap_page.waitForTimeout(2000);
    return gmap_page.screenshot({
        path: path.join(__dirname, informationDirName, fileName + ".jpg"),
        type: "jpeg",
    });
}

// waits for selctor to load -> types with normal speed -> waits -> Enter
async function waitTypeAndEnter(selector, data) {
    await gmap_page.waitForSelector(selector, { visible: true});
    await gmap_page.type(selector, data, { delay: 50 });
    await gmap_page.waitForTimeout(500);
    return gmap_page.keyboard.press("Enter");
}

// waits for selctor to load -> waits -> clicks the selector
async function waitAndClick(selector) {
    await gmap_page.waitForSelector(selector, { visible: true});
    await gmap_page.waitForTimeout(500);
    return gmap_page.click(selector);
}

let gmap_page;
async function gMaps(browserRef, hospital_detailsObjArr) {
	try {
		gmap_page = await browserRef.newPage();

        let allHosp_mapsObjArr = [];
        for (let i = 0; i < hospital_detailsObjArr.length; i++) {
            // nav to google maps -> type hospital name -> press Enter
            await gmap_page.goto(googleMaps_link);

            console.log("Searching Address of " + hospital_detailsObjArr[i].Name);
            await waitTypeAndEnter("#searchboxinput", hospital_detailsObjArr[i].Address);
            
            // click directions -> type address + enter -> click 1st route suggestion
            await waitAndClick("div.iRxY3GoUYUY__taparea");
            console.log("Typing " + hospital_detailsObjArr[i].Name + " address");
            await waitTypeAndEnter("#sb_ifc51", authObj.address);
            await waitAndClick("#section-directions-trip-0");

            // Extract Information
            // 1.Duration 
            // 2.km 
            // 3.Google Maps Link
            function browserGmap() {
                
                let timeToReach = document.querySelector(".section-trip-summary-title span span").innerText;
                let distance = document.querySelector(".section-trip-summary-subtitle").innerText;

                let gmapObj = {
                    "ETA": timeToReach,
                    "Distance": distance,
                    "Google_Maps_Link": document.URL
                }

                return gmapObj;
            }
            await gmap_page.waitForSelector(".section-trip-summary-subtitle");
            let gmapObj = await gmap_page.evaluate(browserGmap);
            console.log("Details of " + hospital_detailsObjArr[i].Name + ": ");
            console.log(gmapObj);

            // Capture SS
            console.log("Taking SnapShot!");
            await takeSS(hospital_detailsObjArr[i].Name + "_location");

            console.log("Pushing gmapObj in allHosp_mapsObjArr");
            allHosp_mapsObjArr.push(gmapObj);
        }
        // close page -> return gmap_info
        gmap_page.close();
        return allHosp_mapsObjArr;

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
	gMapsFn: gMaps,
};
