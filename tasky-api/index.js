import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';
import './db';

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    if (process.env.NODE_ENV === 'production') {
        res.status(statusCode).json({ message: 'Something went wrong!' });
    } else {
        res.status(statusCode).json({ message: 'Hey!! You caught the error 👍👍', stack: err.stack });
    }
};

app.use(express.json());
app.use('/api/tasks', tasksRouter);

app.use(errHandler);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
