const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const hospitalFnObj = require("./Utilities/hospital.js");
const gMapsFnObj = require("./Utilities/gmaps.js")
const gmailsendFnObj = require("./Utilities/authMail/sendMail.js")
const { email, password } = require("../auth_details.js");


let recieverEmail = process.argv[2];

function infoDir(){
    let folderPath = path.join(__dirname, "Utilities", "Information");

    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}

async function toHTML(details) {

    let html=
    '<link rel="stylesheet" href="styles.css">'
    html+=`<h1 style="text-align:center ;color:black"> <u>HOSPITALS NEARBY YOU</u></h1>`
    html += details.map((detail,idx) => {
            let detailHtml = `
            <h2 style="margin-left: 40px;color:blue">${idx+1+"."} ${detail.HospitalInfo.Name}</h1>
            <p style="margin-left: 50px"><b>Address:</b> ${detail.HospitalInfo.Address}</p>
                <p style="margin-left: 50px"><b>Contact Number:</b> ${detail.HospitalInfo.Number}</p>
                <p style="margin-left: 50px"><b>Timing:</b> ${detail.HospitalInfo.Timings}</p>
                <p style="margin-left: 50px"><b>Rating:</b> ${detail.HospitalInfo.Rating}</p>
                <br>
                <img src='${detail.HospitalInfo.Name}_details.jpg' style="margin-left: 50px";border: 5px solid lightgray" width="800" >
                <br><br><br>
                <img src='${detail.HospitalInfo.Name}_photo.jpg' style="margin-left: 50px" ;border: 5px solid lightgray" width="800" >
                <br><br><br>
                <p style="margin-left: 50px"><b>Estimated Time of Arrival:</b> ${detail.GmapLinks.ETA}</h4>
                <p style="margin-left: 50px"><b>Distance:</b>${detail.GmapLinks.Distance}</p>
                <p style="margin-left: 50px"><a href="${detail.GmapLinks.Google_Maps_Link}"><b>GoTo Google Maps</b></a></p>
                <br><br>
                <img src='${detail.HospitalInfo.Name}_location.jpg' style="margin-left: 50px" ;border: 5px solid lightgray" width="1100" 
                height="500">
                <br><br><br><br><br>
                `;
        return detailHtml;
    }) .join(" ");
    await fs.promises.writeFile("./Utilities/Information/details.html", html);

    //console.log(html);
}

async function pdfconverter(){
    const browser = await puppeteer.launch({
      headless:true
    });
    const tab = await browser.newPage();
    await tab.goto("C:\\KHUSHI\\STUDY\\f\\activity\\Utilities\\Information\\details.html",{
      waitUntil:"load"
    })
    await tab.pdf({ path: './Utilities/authMail/hospital_details.pdf'}); 
    browser.close();
}

(async function () {
    try {
        // Create Information Directory
        infoDir();

        // Launch Browser
		let browserRef = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
			args: ["--start-maximized"],
        });
        
        // Extract Information on nearby Hospital 
        let hospital_details_ObjArr = await hospitalFnObj.hospitalFn(browserRef);
        console.log("=============Hospital fn Executed=============");
        // console.log(hospital_details_ObjArr);
        // console.table(hospital_details_ObjArr);
        
        // // Extract nearby Hospital route details
        let gMaps_info_ObjArr = await gMapsFnObj.gMapsFn(browserRef, hospital_details_ObjArr);
        console.log("=============GMAPs fn Executed=============");
        // console.log(gMaps_info_ObjArr);
        // console.table(gMaps_info_ObjArr);

        let AllHospitalsArr = [];
        for (let i = 0; i < 3; i++){
            let tempArr = {
                "HospitalInfo": hospital_details_ObjArr[i],
                "GmapLinks": gMaps_info_ObjArr[i],
            }
            AllHospitalsArr.push(tempArr);
        }
        console.log("=============json creation===================");

        await fs.promises.writeFile(
            "./Utilities/Information/details.json",
            JSON.stringify(AllHospitalsArr)
        );

        console.log("=============html creation===================");
        let data = await fs.promises.readFile("./Utilities/Information/details.json", "utf-8");
        let hospitalData = JSON.parse(data);
        
        console.log("Html file creating...");
        await toHTML(hospitalData);
        console.log("Html file created");
        
        console.log("Pdf file creating..");
        await pdfconverter();
        console.log("Pdf file created..");

        // Send Mail
        let mesg = await gmailsendFnObj.gmailsendFn(recieverEmail);
        console.log(mesg);

        browserRef.close();
	} catch (error) {
		console.log(error);
	}
})();



// "./Utilities/Information"