import express, { Application } from "express";
import {connectToRedis} from './redis';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import fetchStockData from './watcher';

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

connectToRedis();
fetchStockData();

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error?.message}`);
}
