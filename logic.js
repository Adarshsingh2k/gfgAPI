const cheerio = require("cheerio")
const axios = require("axios");
const { response } = require("express");
// const { index } = require("cheerio/lib/api/traversing");

async function getUserData(user) {
    const apiUrl = `https://auth.geeksforgeeks.org/user/${user}`;

try{
    const out = await axios.get(apiUrl).then((response) => {
        console.log("---------------------------------------------------------")
        // console.log(response.data)

        return response.data
    })
        .catch((err) => {

            console.log(err);
            return;
        });

    const $ = cheerio.load(out)

    //    score_cards_container
    // let scoreContainer=$(".score_cards_container ").html()
    // console.log(scoreContainer)

    // let scoreData=$(".score_card_value").html()
    // console.log(scoreData)

    let finishedData = {}

    const combinedScores = [];
    const scoreCardNames = [];
    const scoreCardValues = [];

    $('.score_card_name').each((index, element) => {
        const value = $(element).text();
        scoreCardNames.push(value);
    });

    $('.score_card_value').each((index, element) => {
        const value = $(element).text();
        scoreCardValues.push(value);
    });

    console.log(scoreCardNames);
    console.log(scoreCardValues);

    // get total number of hard, medium, easy question solved
    // solved_problem_section
    // linksTypeProblem
    const problemLevel=[]
    $(".linksTypeProblem li").each((index, element) => {
        const linkText = $(element).find("a").text();
        problemLevel .push(linkText);
      });
   
    

    for (let i = 0; i < scoreCardNames.length; i++) {
        const obj = {
            valName: scoreCardNames[i],
            scoreVal: scoreCardValues[i]

        }
        combinedScores.push(obj);
    }

    problemLevel.map(item => {
        const matches = item.match(/^(.*?)\s*\((\d+)\)$/);
        if (matches) {
          const valName = matches[1].trim();
          const scoreVal = parseInt(matches[2]);
          combinedScores.push({ valName, scoreVal });
        } 
      });

    console.log(combinedScores);

    return combinedScores;
}

catch (error) {
    console.error('Error fetching HTML data:', error);
    throw error; // Re-throw the error to be caught in the calling function
  }

    // return out



}

module.exports = {
    getUserData
}