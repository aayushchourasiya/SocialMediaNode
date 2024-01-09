const authExpressRouter = require('.');
const authFunction = require('../services/auth.service');

authExpressRouter.get('/generateToken', authFunction?.generateToken);

module.exports = authExpressRouter;
