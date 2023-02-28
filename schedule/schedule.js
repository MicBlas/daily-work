const { Console } = require("console");
const fs = require("fs");

const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function controlSchedule() {
	let answer = await monthOfData();
	let mapOfSchedule = await checkOurSchedule();
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
