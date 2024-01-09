const expressTypes = require('express');

const checkEmailIsValid = (
  req: typeof expressTypes.Request,
  res: typeof expressTypes.Response,
) => {
  const {email} = req.body;
  console.log('testing done');
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    res.status(400).send('Please check your email!');
  } else {
    return true;
  }
};

const basicValidations = (
  req: typeof expressTypes.Request,
  res: typeof expressTypes.Response,
) => {
  const {name, password} = req.body;
  if (!name.trim().length || !password.trim().length) {
    res.status(400).send('Please check your name and password!');
  } else {
    return true;
  }
};

module.exports = {checkEmailIsValid, basicValidations};
