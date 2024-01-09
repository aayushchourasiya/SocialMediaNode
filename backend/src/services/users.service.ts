const QueryResult = require('pg')?.QueryResult;
const userExpressTypes = require('.');
const bcrypt = require('bcrypt');
const poolImported = require('./database.service');
const authFunctions = require('./auth.service');

const getAllUsers = async (
  req: typeof userExpressTypes.Request,
  res: typeof userExpressTypes.Response,
) => {
  try {
    const client = await poolImported.connect();
    const result: typeof QueryResult = await client.query(
      'SELECT * FROM users',
    );
    const users = result.rows;
    res.json(users);
    client.release();
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).send('Internal Server Error');
  }
};

const addUser = async (
  req: typeof userExpressTypes.Request,
  res: typeof userExpressTypes.Response,
  next: typeof userExpressTypes.NextFunction,
) => {
  try {
    const client = await poolImported.connect();
    const {name, password, email} = req.body;
    let uniqueId = Math.floor(Math.random() * 10000000);
    const checkUniqueId = await client.query(
      'SELECT * FROM users WHERE userId=' + uniqueId,
    );
    if (checkUniqueId) {
      uniqueId = Math.floor(Math.random() * 10000000);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.query(
      'INSERT INTO users(name, email, password,userId) VALUES($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, uniqueId],
    );
    const token = await authFunctions?.generateToken({name, email, uniqueId});
    res.json({success: true, token});
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Error fetching users', error);
    if (
      (error as {detail?: string})?.detail &&
      (error as {detail: string}).detail.includes('email') &&
      (error as {detail: string}).detail.includes('already exists')
    ) {
      res.status(400).send('Email already exists!');
      next('Email already exists!');
      return;
    }
    res.status(500).send('Internal Server Error');
    next('Internal Server Error');
  }
};

module.exports = {
  getAllUsers,
  addUser,
};
