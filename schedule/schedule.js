const { Console } = require("console");
const fs = require("fs");

const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function controlSchedule() {
	let answer = await monthOfData();
	let month = answer[0];
	let year = answer[1];
	//let mapOfSchedule = await checkOurSchedule();
	let monday = await mondayInMonth(month, year);
	let tuesday = await tuesdayInMonth(month, year);
	let wednesday = await wednesdayInMonth(month, year);
	let thursday = await thursdayInMonth(month, year);
	let friday = await fridayInMonth(month, year);
	let saturday = await saturdayInMonth(month, year);
	let sunday = await sundayInMonth(month, year);
}
controlSchedule();

//ASK USER ABOUT MONTH
function monthOfData() {
	return new Promise(resolve => {
		readline.question(
			"What month is the data for? Please, enter date in format: mm-yyyy e.g. 01-2023:" +
				"\n" +
				"\n",

			answer => {
				let answerMonth = answer.substring(0, 2);
				let answerYear = answer.substring(3);
				let date = [answerMonth, answerYear];
				resolve(date);
				//readline.close();
			}
		);
	});
}

//CHECK OUR SCHEDULE
function checkOurSchedule() {
	return new Promise(resolve => {
		//READ DATA FROM CSV
		let points = fs.readFile("./zal.csv", "utf8", (err, data) => {
			if (err) {
				console.error(err);
			} else {
				let stringToArray = data.split("\r\n");
				//console.log(stringToArray instanceof Array); //true
				let map1 = new Map();

				for (let i = 1; i < stringToArray.length; i++) {
					let stringToArray2 = stringToArray[i].split(";"); //separate mpk
					//console.log(stringToArray2); //true
					let mpk = stringToArray2[1].substring(8);
					let days = stringToArray2[5];
					let daysForAgency = [];

					if (days.includes("poniedzia")) {
						daysForAgency.push(1);
					}
					if (days.includes("wtorek")) {
						daysForAgency.push(2);
					}
					if (days.includes("roda")) {
						daysForAgency.push(3);
					}
					if (days.includes("czwartek")) {
						daysForAgency.push(4);
					}
					if (days.includes("pi?tek")) {
						daysForAgency.push(5);
					}
					if (days.includes("sobota")) {
						daysForAgency.push(6);
					}
					if (days.includes("niedziela")) {
						daysForAgency.push(0);
					}
					map1.set(mpk, daysForAgency);
				}
				//console.log(map1);
				resolve(map1);
			}
		});
	});
}

function mondayInMonth(month, year) {
	return new Promise(resolve => {
		let days = new Date(year, month, 0).getDate(); //get the number of days of the month for the specified month
		//the day number 0 (Sunday) to 6 (Saturday).
		let monday = [(9 - new Date(month + "/01/" + year).getDay()) % 7];

		//console.log(monday);
		//getDay - Get weekday as a number (0-6)

		for (let i = monday[0] + 7; i <= days; i += 7) {
			//increase 7 days
			monday.push(i);
		}
		for (let j = 0; j < monday.length; j++) {
			if (monday[j] == 0) {
				monday.splice(monday[j], 1);
			}
		}
		resolve(monday.length);
		//return monday;
		//console.log(monday);
	});
}

function tuesdayInMonth(month, year) {
	return new Promise(resolve => {
		let days = new Date(year, month, 0).getDate();
		let tuesday = [(10 - new Date(month + "/01/" + year).getDay()) % 7];

		for (let i = tuesday[0] + 7; i <= days; i += 7) {
			tuesday.push(i);
		}
		for (let j = 0; j < tuesday.length; j++) {
			if (tuesday[j] == 0) {
				tuesday.splice(tuesday[j], 1);
			}
		}
		resolve(tuesday.length);
	});
}

function wednesdayInMonth(month, year) {
	return new Promise(resolve => {
		let days = new Date(year, month, 0).getDate();
		let wednesday = [(11 - new Date(month + "/01/" + year).getDay()) % 7];
		//let wednesdays = [];
		for (let i = wednesday[0] + 7; i <= days; i += 7) {
			wednesday.push(i);
		}
		for (let j = 0; j < wednesday.length; j++) {
			if (wednesday[j] == 0) {
				wednesday.splice(wednesday[j], 1);
			}
		}
		resolve(wednesday.length);
	});
}
function thursdayInMonth(month, year) {
	return new Promise(resolve => {
		let days = new Date(year, month, 0).getDate();
		let thursday = [(12 - new Date(month + "/01/" + year).getDay()) % 7];

		for (let i = thursday[0] + 7; i <= days; i += 7) {
			thursday.push(i);
		}
		for (let j = 0; j < thursday.length; j++) {
			if (thursday[j] == 0) {
				thursday.splice(thursday[j], 1);
			}
		}
		resolve(thursday.length);
	});
}
function fridayInMonth(month, year) {
	return new Promise(resolve => {
		let days = new Date(year, month, 0).getDate();
		let friday = [(13 - new Date(month + "/01/" + year).getDay()) % 7];

		for (let i = friday[0] + 7; i <= days; i += 7) {
			friday.push(i);
		}
		for (let j = 0; j < friday.length; j++) {
			if (friday[j] == 0) {
				friday.splice(friday[j], 1);
			}
		}
		resolve(friday.length);
	});
}
function saturdayInMonth(month, year) {
	return new Promise(resolve => {
		let days = new Date(year, month, 0).getDate();
		let saturday = [(14 - new Date(month + "/01/" + year).getDay()) % 7];

		for (let i = saturday[0] + 7; i <= days; i += 7) {
			saturday.push(i);
		}
		for (let j = 0; j < saturday.length; j++) {
			if (saturday[j] == 0) {
				saturday.splice(saturday[j], 1);
			}
		}

		resolve(saturday.length);
	});
}
function sundayInMonth(month, year) {
	return new Promise(resolve => {
		let days = new Date(year, month, 0).getDate();
		let sunday = [(15 - new Date(month + "/01/" + year).getDay()) % 7];
		//let sundays = sunday;

		for (let i = sunday[0] + 7; i <= days; i += 7) {
			sunday.push(i);
		}
		for (let j = 0; j < sunday.length; j++) {
			if (sunday[j] == 0) {
				sunday.splice(sunday[j], 1);
			}
		}

		resolve(sunday.length);
		//console.log(sunday.length);
	});
}
