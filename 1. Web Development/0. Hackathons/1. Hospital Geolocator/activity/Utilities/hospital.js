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

async function takeSS(fileName) {
    await hospital_page.waitForTimeout(2000);
    return hospital_page.screenshot({
        path: path.join(__dirname, informationDirName, fileName + ".jpg"),
        type: "jpeg",
    });
}

async function waitAndClick(selector) {
    await hospital_page.waitForSelector(selector, { visible: true });
    // await hospital_page.waitForTimeout(500);
    return hospital_page.click(selector);
}

async function waitTypeAndEnter(selector, data) {
    await hospital_page.waitForSelector(selector, { visible: true});
    await hospital_page.type(selector, data, { delay: 100});
    await hospital_page.waitForTimeout(500);
    return hospital_page.keyboard.press("Enter");
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
        await waitTypeAndEnter(".gLFyf.gsfi", "hospitals near me");
        
		// Gather info.
        function browserConsole() {
            
            let h_name = document.querySelector(".dbg0pd span").innerText;
            let h_rating = document.querySelector(".rllt__details.lqhpac div .BTtC6e").innerText;
            let h_number = document.querySelectorAll(".rllt__details.lqhpac div")[1].innerText.split("·")[1];
            let h_address = document.querySelectorAll(".rllt__details.lqhpac div")[1].innerText.split("·")[0];
            let h_openTimings = document.querySelectorAll(".rllt__details.lqhpac div")[2].innerText;
            
            let infoObj = {
                "Name": h_name,
                "Rating": h_rating,
                "Number": h_number,
                "Address": h_address,
                "Timings": h_openTimings,
            };
            
            return infoObj;
        }
        
        await hospital_page.waitForSelector(".dbg0pd span", { visible: true});
        let infoArr = await hospital_page.evaluate(browserConsole);

        // Search for the nearest hospital name and take its ss        
        await hospital_page.goto(google_link);
        await waitTypeAndEnter(".gLFyf.gsfi", infoArr.Name);
        await takeSS("hospital_details");

        // Goto Images and take ss
        await hospital_page.goto(googleImg_link);
        await waitTypeAndEnter(".gLFyf.gsfi", infoArr.Name);

        function browserImage(selector) {
            document.querySelector(selector).click();
        }
        await hospital_page.waitForTimeout(1000);
        await hospital_page.waitForSelector(".bRMDJf.islir", { visible: true });
        
        await hospital_page.evaluate(browserImage, ".bRMDJf.islir");
        await takeSS("hospital_photo");
        
        // await hospital_page.waitForSelector(".hdtb-mitem .hide-focus-ring");
        // function browserImageLink() {
        //     imageLink = document.querySelectorAll(".hdtb-mitem .hide-focus-ring")[1].href;
        //     return imageLink
        // }
        // let imageBtnLink = await hospital_page.evaluate(browserImageLink);
        // await hospital_page.waitForTimeout(1000);
        // await hospital_page.goto(imageBtnLink);

        // wait -> Now take ScreenShot and save its image
        // await takeSS("hospital_photo"); 

        // Save infoArr in a JSON obj
        // createJSON();
        // let file_path = path.join(__dirname, informationDirName, hospitalInfoDir + ".json");
        // fs.writeFileSync(file_path, JSON.stringify(infoArr));

        // close page and return hospital information
        await hospital_page.close();
        return infoArr;
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    hospitalFn: hospitalInfo,
}
