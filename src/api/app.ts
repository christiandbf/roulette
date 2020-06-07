import compression from 'compression';
import express, { Application } from 'express';
import morgan from 'morgan';

const app: Application = express();

app.use(morgan('short'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());

export default app;
