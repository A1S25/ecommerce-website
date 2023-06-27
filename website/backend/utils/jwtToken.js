// Create Token and saving in cookie
const ms = require('ms');

const sendToken = (user, statusCode, res) => {
  // token generation code
  const token = user.getJWTToken();

  // Calculate token expiration time
  const expiresIn = process.env.JWT_EXPIRE || '1d';

  // options for cookie (how much time token left in cookie)
  const options = { expires: new Date(Date.now() + ms(expiresIn)), httpOnly: true, };
  res.status(statusCode).cookie("token", token, options).json({ success: true, user, token, });
};

module.exports = sendToken;