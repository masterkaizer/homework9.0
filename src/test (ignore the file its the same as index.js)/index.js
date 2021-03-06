const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs');
const path = require('path');
async function main(){
    console.log(`starting`);
    const userResponse = await inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your Project Tittle?",
            name: "projectTittle"
        },
        {
            type: "input",
            message: "Provide detail description",
            name: "projectDescription"
        },
        {
            type: "input",
            message: "Enter table of contents",
            name: "tableOfContents"
        },
        {
            type: "input",
            message: "Provide installation steps",
            name: "installation"
        },
        {
            type: "input",
            message: "Provide usage details",
            name: "usage"
        },
        {
            type: "input",
            message: "Provide license name",
            name: "licenseName"
        },
       
        {
            type: "input",
            message: "Please enter git hub user names of the contributor if any (If there are mulitple contributor, seperate names with comma and no space! )",
            name: "contributorsGitUserName"
        },
        {
            type: "input",
            message: "Provide examples on how to run tests.",
            name: "tests"
        },
		 {
            type: "input",
            message: "Any questions?",
            name: "questions"
        }
        ]);
        console.log(`starting`);
        console.log(userResponse);
        const gitUsername = userResponse.username;
        const projectTittle = userResponse.projectTittle;
        const projectDescription = userResponse.projectDescription;
        const tableOfContents = userResponse.tableOfContents;
        const installation = userResponse.installation;
        const usage = userResponse.usage;
        const licenseName = userResponse.licenseName;
        const contributorUserNames = userResponse.contributorsGitUserName;
        const tests = userResponse.tests;
		const questions = userResponse.questions;
            // fetching data from git
            // user
        let gitResponse = {};

        await axios.get(`https://api.github.com/users/${gitUsername}`)
        .then(response => { 
            gitResponse = response;
        })
        .catch(error => {
            console.log(error.response)
        });
        const gitData = gitResponse.data;
        const gitName = gitData.login;
        const gitEmail = gitData.email;
        const gitlocation = gitData.location;
        const gitUrl = gitData.html_url;
        const gitProfileImage = gitData.avatar_url;
            // contributor
        const contributorUserNamesArray = contributorUserNames.split(",");
        console.log(contributorUserNamesArray);
        
        var resultContributor = '';
        for (i=0; i<contributorUserNamesArray.length; i++){
            var contributorsGitUserName = contributorUserNamesArray[i]
            let gitResponse2 = {};

            await axios.get(`https://api.github.com/users/${contributorsGitUserName}`)
        .then(response => { 
             gitResponse2 = response;
        })
        .catch(error => {
            console.log(error.response)
        });
            var gitContribuProfileImage = gitResponse2.data.avatar_url;
            var gitContribuUrl = gitResponse2.data.html_url;
            var gitContribuEmail = gitResponse2.data.email;
            resultContributor = resultContributor + (`
            \n <img src="${gitContribuProfileImage}" alt="drawing" width="150" display="inline"/> ${contributorsGitUserName}  GitHubLink: ${gitContribuUrl}`);
        }
        var result = (`
# ${projectTittle} 
# ${projectDescription}
# ${tableOfContents}
# ${installation}
# ${usage}
# ${licenseName}
# ${resultContributor}
# ${tests}
# ${questions}
# Author Details 
\n![ProfileImage](${gitProfileImage})
\nEmail: ${gitEmail}
`)
var writeResult = fs.writeFileSync(path.join(__dirname, '../out', 'readMe.md'), result )
console.log("file generated....")
    }
main();