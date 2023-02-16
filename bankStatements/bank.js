// GET SAVED FILES
const fs = require("fs");
let namesOfFiles = fs.readdirSync("./files/");
let path = require("path");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

// GET CURRENT DATE
let currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;
let currentDay = currentDate.getDate();
let currentYear = currentDate.getFullYear();

let newListOfAccounts = [];
let value;
let counter = 0;

// MAIN FUNCTION
async function organiseBankStatements() {
	let date = await askUser();
	let properDate = await checkData(date);
	let properAccounts = await checkListOfAccounts();
	let files = await checkFiles(properAccounts, properDate);
	finalInformation(files);
}
organiseBankStatements();

//ASK USER
function askUser() {
	return new Promise(resolve => {
		readline.question(
			"\n" +
				" What is the day of bank stataments? Please, enter date in format: dd-mm-yyyy e.g. 01-01-2023:" +
				"\n" +
				"\n",
			dateOfWb => {
				value = dateOfWb;
				resolve(value);
				//readline.close();
			}
		);
	});
}

//CHECK DATE
function checkData(date) {
	return new Promise(resolve => {
		let days = date.substring(0, 2);
		let year = date.substring(6, 10);
		let month = date.substring(3, 5);
		let hyphen1 = date.substring(2, 3);
		let hyphen2 = date.substring(5, 6);
		if (
			year > currentYear ||
			year < 2023 ||
			(month > currentMonth && year >= currentYear) ||
			days < 1 ||
			days > 31 ||
			(days > 29 && month == 2) ||
			hyphen1 !== "-" ||
			hyphen2 !== "-" ||
			/^\d+$/.test(days) === false ||
			/^\d+$/.test(month) === false ||
			/^\d+$/.test(year) === false
		) {
			console.log(
				"\x1b[91m Check if you enter proper date. Close application and open it again.\x1b[0m"
			);
			return;
		} else {
			resolve(value);
		}
	});
}

// CHECK FILES, CHANGE NAME OF FILES AND SAVE THEM
function checkFiles(properAccounts, properDate) {
	return new Promise(resolve => {
		/*KNOW COMPANY FROM WB*/
		let accountCSV;
		let company;
		let bank;
		let folder;
		let dir;
		let year;
		let month;
		let accountStart;
		let accountEnd;
		let accountWB;
		let extension;
		let customer;
		for (let i = 0; i < namesOfFiles.length; i++) {
			accountStart = namesOfFiles[i].substring(13, 17);
			accountEnd = namesOfFiles[i].substring(18, 22);
			accountWB = accountStart + accountEnd;
			extension = path.extname(namesOfFiles[i]);
			customer = namesOfFiles[i].substring(4, 10);
			//console.log(customer);

			if (extension == ".pdf" || extension == ".mt940") {
				//console.log(properAccounts); //ok
				let wrongFiles = 0;
				for (let j = 1; j < properAccounts.length; j++) {
					accountCSV = properAccounts[j][3];
					company = properAccounts[j][0];
					bank = properAccounts[j][1];
					folder = properAccounts[j][2];
					customerNumber = properAccounts[j][4];
					year = properDate.substring(6, 10);
					month = properDate.substring(3, 5);

					//COMPARE DATA FROM WB WITH CSV
					if (accountWB == accountCSV && customer == customerNumber) {
						//console.log(accountCSV, accountWB, customer, customerNumber);
						wrongFiles++;
						let number = namesOfFiles[i].substring(0, 3);
						let newNameFile = number + " - " + properDate;

						//CREATE NEW FOLDERS
						dir =
							"finalFiles/" +
							company +
							"/" +
							bank +
							"/" +
							folder +
							"/" +
							year +
							"/" +
							month +
							"/";

						if (!fs.existsSync(dir)) {
							fs.mkdirSync(dir, { recursive: true });
						}

						//CHANGE NAMES AND COPY FILES
						fs.copyFile(
							`./files/${namesOfFiles[i]}`,
							`./finalFiles/${company}/${bank}/${folder}/${year}/${month}/${newNameFile}${extension}`,
							renameErr => {
								if (renameErr) {
									console.log("\n" + "\x1b[91m Files are saved. \x1b[0m");
									counter--;
								}
							}
						);
						counter++;
					}
				}
				if (wrongFiles == 0) {
					console.log(
						"\n" +
							"\x1b[31m Can't find account number in file with accounts. \x1b[0m" +
							namesOfFiles[i]
					);
				}
			} else {
				console.log(
					"\n" + "\x1b[91m Wrong extension of file: \x1b[0m" + namesOfFiles[i]
				);
			}
		}
		resolve(counter);
	});
}

// CHECK LIST OF ACCOUNTS
function checkListOfAccounts() {
	return new Promise(resolve => {
		//READ DATA FROM CSV
		let nameOfCompanyCSV = fs.readFile(
			"./accounts.csv",
			"utf8",
			(err, data) => {
				if (err) {
					console.log("\n" + " Error. Can't read file with accounts number.");
				} else {
					let stringToArray = data.split("\r\n");
					let stringToArray2;
					let company;
					let account;
					let accountStartCSV;
					let accountEndCSV;
					let accountCSV;
					let bank;
					let folder;
					let customerNumber;
					for (let i = 0; i < stringToArray.length; i++) {
						stringToArray2 = stringToArray[i].split(";");
						company = stringToArray2[2];
						account = stringToArray2[3];
						//console.log(stringToArray2[4].replace(/ /g, ""));
						accountStartCSV = stringToArray2[4]
							.replaceAll(" ", "")
							//.replace(/ /g, "")
							.slice(0, 4);
						accountEndCSV = stringToArray2[4].replaceAll(" ", "").slice(22, 26);
						accountCSV = accountStartCSV + accountEndCSV;
						bank = stringToArray2[0];
						folder = stringToArray2[5];
						customerNumber = stringToArray2[6];
						newListOfAccounts.push([
							company,
							bank,
							folder,
							accountCSV,
							customerNumber,
						]); //ok
					}
				}
				value = newListOfAccounts;

				resolve(value);
			}
		);
	});
}

// FEEDBACK TO USER
function finalInformation(files) {
	console.log(
		"\n" +
			" Saved: " +
			files +
			" files." +
			"\n" +
			"\n" +
			" Close the application."
	);
}
