const puppeteer = require("puppeteer");
const youtubeLink =
	"https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph";

// Activity Requirements:
// 1) No. of videos
// 2) Views
// 3) Watch Time
// 4) List of videos (json/excel)
// i) name
// ii) duration

(async function () {
	try {
		let browserReference = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
			args: ["--start-maximized"],
		});

		let newPage = await browserReference.newPage();
		await newPage.goto(youtubeLink);

		// No. of Videos + Views
		let videos_viewsArr = await newPage.evaluate(consoleFn);
		console.table(videos_viewsArr);

		// List of Videos
		//First Part
		let totalVideosLength = 899;
		let currntPageTitleLength = await newPage.evaluate(
			scrollToBottom,
			"a#video-title"
		);
		while (currntPageTitleLength < totalVideosLength) {
			currntPageTitleLength = await newPage.evaluate(
				scrollToBottom,
				"a#video-title"
			);
		}

		// Second Part
		let listOfVideosArr = await newPage.evaluate(
			getListOfVideos,
			"a#video-title",
			"span.style-scope.ytd-thumbnail-overlay-time-status-renderer"
		);
		console.table(listOfVideosArr);
	} catch (err) {
		console.log(err);
	}
})();

// No. of Videos + Views
function consoleFn() {
	let details = [];

	let noOfVideos_Views_arr = document.querySelectorAll(
		"#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer"
	);
	let noOfVideos = noOfVideos_Views_arr[0].innerText;
	let views = noOfVideos_Views_arr[1].innerText;

	details.push({
		"Number of Videos: ": noOfVideos,
		"Views: ": views,
	});
	return details;
}

// List of Videos
function scrollToBottom(titleSelector) {
	window.scrollBy(0, window.innerHeight);

	let titleArr = document.querySelectorAll(titleSelector);
	console.log("Title Length: " + titleArr.length);

	return titleArr.length;
}

function getListOfVideos(titleSelector, durationSelector) {
	let allTitlesArr = document.querySelectorAll(titleSelector);
	let allDurationArr = document.querySelectorAll(durationSelector);

	let titlesDurationArr = [];
	for (let i = 0; i < allDurationArr.length; i++) {
		let title = allTitlesArr[i].innerText;
		let duration = allDurationArr[i].innerText;

		titlesDurationArr.push({
			Titles: title,
			Duration: duration,
		});
	}

	return titlesDurationArr;
}
// Watch Time

// Convert to Excel

function toExcel() {}
