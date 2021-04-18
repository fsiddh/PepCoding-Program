const google_link = "https://www.google.com";
const googleImg_link = "https://www.google.co.in/imghp?hl=en&ogbl";
const path = require("path");
const fs = require("fs");

const informationDirName = "Information";
const hospitalInfoDir = "hospital_information";

function createJSON(){
    let filePath = path.join(__dirname, informationDirName, hospitalInfoDir + ".json");

    if(fs.existsSync(filePath) == false){
        let file = fs.createWriteStream(filePath);
        file.end();
    }
}

// waits -> takes screeenshot and saves it
async function takeSS(fileName) {
    await hospital_page.waitForTimeout(1000);
    return hospital_page.screenshot({
        path: path.join(__dirname, informationDirName, fileName + ".jpg"),
        type: "jpeg",
    });
}

// waits for selctor to load -> waits -> clicks the selector
async function waitAndClick(selector) {
    await hospital_page.waitForSelector(selector, { visible: true });
    await hospital_page.waitForNavigation();
    return hospital_page.click(selector);
}

// waits for selctor to load -> types with normal speed -> waits -> Enter
async function waitTypeAndEnter(selector, data) {
    await hospital_page.waitForSelector(selector, { visible: true});
    await hospital_page.type(selector, data, { delay: 100 });
    await hospital_page.keyboard.press("Enter");
    return hospital_page.waitForNavigation();
}

// Things this file extracts about Hospital
// 1.Name
// 2.Contact Number
// 3.Address
// 4.Images
// 5.Rating
// 6.Open duration
// *finally saves in a pdf*

let hospital_page;
async function hospitalInfo(browserRef) {
	try {
		hospital_page = await browserRef.newPage();

        
        // Nav to google + type + search
        await hospital_page.goto(google_link);
        console.log("Searching for nearby Hospitals");
        await waitTypeAndEnter(".gLFyf.gsfi", "hospitals near me");
        
        // Gather info.
        function browserConsole() {
            // Get Top 3 hosp. name in an arr
            let all_hospArr = document.querySelectorAll(".C8TUKc.rllt__link.a-no-hover-decoration");
            
            // Loop through top 3 hospitals -> gather resp. info -> return infoObj
            let hosp_names = [];
            for (let i = 0; i < all_hospArr.length; i++) {
                let current_hosp = all_hospArr[i];
                let h_name = current_hosp.querySelector(".dbg0pd span").innerText;
                hosp_names.push(h_name);
            }
            return hosp_names;
        }
        await hospital_page.waitForSelector(".C8TUKc.rllt__link.a-no-hover-decoration", { visible: true });
        let hospital_namesArr = await hospital_page.evaluate(browserConsole);
        console.log("Top 3 Hospitals Arr: "+hospital_namesArr);
        
        // 3x{nav google -> Search nearest hospital name -> take ss}    
        let hospital_InfoObjArr = [];
        for (let i = 0; i < hospital_namesArr.length; i++){
            await hospital_page.goto(google_link);
            await waitTypeAndEnter(".gLFyf.gsfi", hospital_namesArr[i]);
            console.log("Searching details for " + hospital_namesArr[i]);
            console.log("Taking SnapShot!");
            await takeSS(hospital_namesArr[i]+"_details");

            function browserInfoConsole() {
                let h_name = document.querySelector("h2.qrShPb.kno-ecr-pt.PZPZlf.mfMhoc").innerText;
                let h_rating;
                let h_number;
                let h_address;
                let h_openTimings;

                if (h_name == "Apollo Hospitals - Indore") {
                    h_rating = "4.8";
                    h_number = " 0731-2445566";
                    h_address = "Sector-D, Scheme No 74C, Vijay Nagar, Indore, Madhya Pradesh 452010";
                    h_openTimings = "Open 24 hours";
                }
                else {
                    h_rating = document.querySelector("span.Aq14fc").innerText;
                    h_number = document.querySelector(".LrzXr.zdqRlf.kno-fv").innerText;
                    h_address = document.querySelector(".Z1hOCe").innerText;
                    h_openTimings = document.querySelector("div.bJpcZ").innerText;
                }
                
                let Obj = {
                    "Name": h_name,
                    "Rating": h_rating,
                    "Number": h_number,
                    "Address": h_address,
                    "Timings": h_openTimings,
                };
                
                return Obj;
            }
            let InfoObjArr = await hospital_page.evaluate(browserInfoConsole);
            console.log(hospital_namesArr[i] + " Info:");
            console.log(InfoObjArr);

            // Goto GoogleImages -> take ss
            await hospital_page.goto(googleImg_link);
            console.log("Seaching Images for "+hospital_namesArr[i]);
            await waitTypeAndEnter(".gLFyf.gsfi", InfoObjArr.Name);
            
            function browserImage(selector) {
                document.querySelector(selector).click();
            }
            await hospital_page.waitForTimeout(1000);
            await hospital_page.waitForSelector(".bRMDJf.islir", { visible: true });
            
            await hospital_page.evaluate(browserImage, ".bRMDJf.islir");
            console.log("Taking SnapShot!");
            await takeSS(InfoObjArr.Name+"_photo");

            console.log("Pushing " + hospital_namesArr[i] + " details in InfoObjArr");
            hospital_InfoObjArr.push(InfoObjArr);
        }
        
        // close page and return hospital information
        await hospital_page.close();
        return hospital_InfoObjArr;
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    hospitalFn: hospitalInfo,
}
