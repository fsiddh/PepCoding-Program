let videoElem = document.querySelector("video"); // will only be available by autoplay or control
let videoRecorder = document.querySelector("#record-video");
let recordState = false;
let captureBtn = document.querySelector("#capture");
let timingELem = document.querySelector("#timing");
let clearObj;
let uiFilter = document.querySelector(".ui-filter");
let filterColor = "";
let filterContainer = document.querySelector(".filter-container");
let allFilters = document.querySelectorAll(".filter");
let zoomBox = document.querySelector(".zoom");
let zoomInElem = document.querySelector("#plus-container");
let zoomOutElem = document.querySelector("#minus-container");
let zoomLevel = 1;
// let audioElem = document.querySelector("audio");

// permissions
let constraints = {
    video:true,
    audio: true,
}

let mediaRecorder;
// will store recorded video
let buffer = [];
// navigator has info abt browser
// The Navigator.mediaDevices read-only property returns a MediaDevices object, which provides access to connected media input devices like cameras and microphones, as well as screen sharing.
navigator.mediaDevices
// getUserMedia => With the user's permission through a prompt, turns on a camera and/or a microphone on the system and provides a MediaStream containing a video track and/or an audio track with the input.
.getUserMedia(constraints) 
    .then(function (mediaStream) {
        //feed ui
        videoElem.srcObject = mediaStream; // a MediaStream containing a video track and/or an audio track with the input.
        

        mediaRecorder = new MediaRecorder(mediaStream); // Creates a new MediaRecorder object, given a MediaStream to record
        
        // triggers on mediaRecorder.start()
        mediaRecorder.addEventListener("dataavailable",function(e){
            buffer.push(e.data);
        })
        // triggers on mediaRecorder.stop()
        mediaRecorder.addEventListener("stop", function (e) {
            // convert data to blob
            const blob = new Blob(buffer, { type: 'video/mp4' }); // converts data to file of this type
            addMediaToGallery(blob, 'video');

            
            // const url = window.URL.createObjectURL(blob); // creates file to url
            // // download btn
            // let a = document.createElement("a");
            // // download
            // a.download = "file.mp4"; // downloads in this file
            // a.href = url; // url contains data
            // a.click();
            // buffer = [];
        })
}).catch(function(err){
    console.log(err);
})

videoRecorder.addEventListener("click", function (e) {
    
    console.log("video clicked");
    if(!mediaRecorder){ 
        alert("first allow permissions");
        return;
    }
    // start(),start timer,change icon+add animation
    if (recordState == false) {
        uiFilter.classList.remove("ui-filter-active");
        uiFilter.style.backgroundColor = "";
        filterContainer.style.display = "none";
        mediaRecorder.start() // automatically triggers dataavailable event
        recordState = true;
        let currZoom = 1;
        videoElem.style.transform = `scale(${currZoom})`;
        zoomBox.style.display = "none";
        startCounting();
        videoRecorder.setAttribute("class","fas fa-stop-circle record-btn record-animation")
    }
    // stop(),stop timer,change icon
    else {
        zoomBox.style.display = "block";
        filterContainer.style.display = "block";
        uiFilter.classList.add("ui-filter-active");
        uiFilter.style.backgroundColor = filterColor;
        mediaRecorder.stop(); // automatically trigger stop event
        recordState = false;
        stopCounting();
        videoRecorder.setAttribute("class","fas fa-video record-btn")
    }
});

// create canvas of size of videoFrame,draw current frame,add/remove animation,download
captureBtn.addEventListener("click", function (e) {
    console.log("clicked capture");
    let canvas = document.createElement("canvas");
    canvas.width = videoElem.videoWidth;
    canvas.height = videoElem.videoHeight;
    captureBtn.classList.add("capture-animation");
    let tool = canvas.getContext("2d");
    tool.translate(canvas.width / 2, canvas.height / 2);
    tool.scale(zoomLevel, zoomLevel);
    tool.translate(-canvas.width / 2, -canvas.height / 2);
    tool.drawImage(videoElem, 0, 0);

    if (filterColor != "") {
        tool.fillStyle = filterColor;
        tool.fillRect(0, 0, canvas.width, canvas.height);
    }
    addMediaToGallery(canvas.toDataURL(), 'img');
    // let link = canvas.toDataURL(); // converts to link 
    // let a = document.createElement("a");
    // a.href = link;
    // a.download = "file.png";
    // a.click();
    // a.remove();
    // canvas.remove();
    setTimeout(function () {
        captureBtn.classList.remove("capture-animation");
    }, 1000)
})

// timer 
function startCounting() {
    timingELem.classList.add("timing-active");
    let timeCount = 0;
    clearObj = setInterval(function () {
        let seconds = (timeCount % 60) < 10 ? `0${timeCount % 60}` : `${timeCount % 60}`;
        let minutes = (timeCount / 60) < 10 ? `0${Number.parseInt(timeCount / 60)}` : `${Number.parseInt(timeCount / 60)}`;
        let hours = (timeCount / 3600) < 10 ? `0${Number.parseInt(timeCount / 3600)}` : `${Number.parseInt(timeCount / 3600)}`;
            timingELem.innerText = `${hours}:${minutes}:${seconds}`;
        timeCount++;
    }, 1000);
}
function stopCounting() {
    timingELem.classList.remove("timing-active");
    timingELem.innerText = "00: 00: 00";
    clearInterval(clearObj);
}

for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener("click", function () {
        // add filter to ui
        let color = allFilters[i].style.backgroundColor;
        if (color) {
            uiFilter.classList.add("ui-filter-active");
            uiFilter.style.backgroundColor = color;
            filterColor = color;
        } else {
            uiFilter.classList.remove("ui-filter-active");
            uiFilter.style.backgroundColor = "";
            filterColor = "";
        }
    })
}

// zoom in zoom out
zoomInElem.addEventListener("click", function () {
    if (zoomLevel < 3) {
        zoomLevel += 0.2;
        videoElem.style.transform = `scale(${zoomLevel})`;
    }
})
zoomOutElem.addEventListener("click", function () {
    if (zoomLevel > 1) {
        zoomLevel -= 0.2;
        videoElem.style.transform = `scale(${zoomLevel})`;
    }
})
