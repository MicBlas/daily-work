<<<<<<< HEAD
=======
const { Console } = require("console");
const fs = require("fs");

const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function controlSchedule() {
	let answer = await monthOfData();
	console.log(answer);
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
>>>>>>> c7e7895 (add function-ask user about month)
