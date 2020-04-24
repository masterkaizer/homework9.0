require("dotenv").config();
const axios = require("axios");

const api = {
  getUser(username) {
    const userURL = `https://api.github.com/users/${username}`;
    const config = {
      headers: {
        Authorization: `token ${process.env.API_KEY}`,
      },
    };
    return axios.get(userURL, config);
  },
};

module.exports = api