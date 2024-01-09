const expressEngine = require('express');

const usersRouter = require('./src/routes/users.routes');
const authRouter = require('./src/routes/auth.routes');

const app = expressEngine();
const port = 3000;

// Middleware to parse JSON requests
app.use(expressEngine.json());

app.use('/', usersRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
