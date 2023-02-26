# daily-work

For daily basis tasks

## Purpose

The purpose of these repositories is to automate daily tasks and make my work easier. Each folder represents one task which I use in my daily job.

<br>

## Apps/scripts

---

<br>

### => **Bank statements.**

Purpose: To automate the proces of organizing bank statements

User downloads bank statements, save them into the folder and run the script.

Script copies files, changes names of bank statements files and saves each file into the proper folder structure.

It's significantly shortens time of organizing bank statements.

### Technologies:

- Vanilla Java Script
- Node.js

### Features:

- Users enter date of bank statements, which is next used in names od files.
- Users can enter only date (validation). The date can't be later than today and earlier than 2023.
- Script checks if folder exists. If there isn't folder with proper name, script creates them.
- App copies files, changes names of bank statements and saves each file into the proper folder structure.
- Users receive information about the number of saved files.
- In case of errors, script gives information what is wrong e.g. wrong type of files.
- Additional used different colors of font.</br>

---

<br>

### => **CComomparison arrival schedule.**

Purpose: To automate the process of verification data from client

User saves two files into the folder and runs the script.

Script checks how many days of the week is in the month and counts the proper number of arrivals for each point. Next script compares the proper numbers of arrivals with data from client.

### Technologies:

- Vanilla Java Script
- Node.js
