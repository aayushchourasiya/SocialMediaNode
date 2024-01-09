const authExpressTypes = require('.');
const jwt = require('jsonwebtoken');

const generateToken = async (
  req: typeof authExpressTypes.Request,
  res: typeof authExpressTypes.Response,
) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = req?.body ? {...req?.body} : {...req};
  const token = jwt.sign(data, jwtSecretKey);
  if (req?.body) {
    return res?.send({status: true, token});
  }
  return token;
};

module.exports = {generateToken};
