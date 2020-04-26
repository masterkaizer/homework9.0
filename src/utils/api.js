require("dotenv").config();
import { get } from "axios";

const api = {
  getUser(username) {
    const userURL = `https://api.github.com/users/${username}`;
    const config = {
      headers: {
        Authorization: `token ${process.env.API_KEY}`,
      },
    };
    return get(userURL, config);
  },
};

export default api