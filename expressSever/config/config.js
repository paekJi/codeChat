const dotenv = require("dotenv");

const envFile = process.env.NODE_ENV === "prod" ? ".env.prod" : ".env.dev";
dotenv.config({ path: envFile });

module.exports = {
  accessKey: process.env.ACCESS_TOKEN_KEY,
  refreshKey: process.env.REFRESH_TOKEN_KEY,
  httpYn: process.env.HTTP_YN,
};

