import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';
import usersRouter from './api/users';
import './db';
import cors from 'cors';

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

const errHandler = (err, req, res, next) => {
    /* if the error in development then send stack trace to display whole error,
    if it's in production then just send error message  */
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).send(`Something went wrong!`);
    }
    res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

app.use(errHandler);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
