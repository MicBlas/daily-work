const { Console } = require("console");
const fs = require("fs");

const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function controlSchedule() {
	let answer = await monthOfData();
	let mapOfSchedule = await checkOurSchedule();
	let monday = await mondayInMonth(month, year);
	let tuesday = await tuesdayInMonth(month, year);
	let wednesday = await wednesdayInMonth(month, year);
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
				value = answer;
				resolve(value);
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
