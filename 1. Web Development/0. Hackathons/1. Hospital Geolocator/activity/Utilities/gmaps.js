const path = require("path");
const authObj = require("../../auth_details.js");

const googleMaps_link = "https://www.google.com/maps";
const informationDirName = "Information";

async function takeSS(fileName) {
    await gmap_page.waitForTimeout(2000);
    return gmap_page.screenshot({
        path: path.join(__dirname, informationDirName, fileName + ".jpg"),
        type: "jpeg",
    });
}

async function waitTypeAndEnter(selector, data) {
    await gmap_page.waitForSelector(selector, { visible: true});
    await gmap_page.type(selector, data, { delay: 50 });
    await gmap_page.waitForTimeout(500);
    return gmap_page.keyboard.press("Enter");
}

async function waitAndClick(selector) {
    await gmap_page.waitForSelector(selector, { visible: true});
    await gmap_page.waitForTimeout(500);
    return gmap_page.click(selector);
}

let gmap_page;
async function gMaps(browserRef, hospital_name, hospital_address) {
	try {
		gmap_page = await browserRef.newPage();

		// nav to google maps -> press Enter
        await gmap_page.goto(googleMaps_link);
        await waitTypeAndEnter("#searchboxinput", hospital_address);
        
        // click directions -> type address -> enter -> click 1st route suggestion
        await waitAndClick("div.iRxY3GoUYUY__taparea");
        await waitTypeAndEnter("#sb_ifc51", authObj.address);
        await waitAndClick("#section-directions-trip-0");

        // Extract Information
        // 1.Duration 2.km
        function browserGmap() {
            
            let timeToReach = document.querySelector(".section-trip-summary-title span span").innerText;
            let distance = document.querySelector(".section-trip-summary-subtitle").innerText;

            let gmapObj = {
                "Time to Reach": timeToReach,
                "Distance": distance,
                "Google Maps Link": document.URL
            }

            return gmapObj;
        }
        await gmap_page.waitForSelector(".section-trip-summary-subtitle");
        let gmapObj = await gmap_page.evaluate(browserGmap);

        // Capture SS
        await takeSS("hospital_location");
        
        // close page -> return gmap_info
        gmap_page.close();
        return gmapObj;

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
	gMapsFn: gMaps,
};
