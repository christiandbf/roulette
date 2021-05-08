import compression from 'compression';
import express, { Application } from 'express';
import morgan from 'morgan';
import routes from './routes';

const app: Application = express();
app.disable('x-powered-by');

app.use(morgan('short'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use('/', routes);

export default app;
