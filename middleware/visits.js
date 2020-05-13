const browser = require("browser-detect")

const visitCounter = (req, res, next) => {
  const result = browser(req.headers['user-agent']);
     console.log(result);
}

module.exports = visitCounter
