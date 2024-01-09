const usersExpressRouter = require('.');
const usersFunction = require('../services/users.service');
const handlers = require('../handlers');
const validations = require('../middlewares/validations');
const usersExpress = require('express');

usersExpressRouter.get(
  '/users',
  (req: typeof usersExpress.Request, res: typeof usersExpress.Response) =>
    handlers?.handler([() => usersFunction?.getAllUsers(req, res)]),
);
usersExpressRouter.post(
  '/add-user',
  (
    req: typeof usersExpress.Request,
    res: typeof usersExpress.Response,
    next: typeof usersExpress.NextFunction,
  ) =>
    handlers?.handler([
      () => validations?.basicValidations(req, res),
      () => validations?.checkEmailIsValid(req, res),
      () => usersFunction?.addUser(req, res, next),
    ]),
);

module.exports = usersExpressRouter;
