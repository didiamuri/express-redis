import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import routes from './routes';
import AppError from '@src/utils/app-error';
import { normalizePort } from '@src/utils';
import { mongodb, redis } from '@src/database';
import { badUrl, cors, errorHandler, session } from '@src/middlewares';

const app = express();
const server = http.createServer(app);
const port = normalizePort(process.env.PORT);

/** Augment express-session with a custom SessionData object */
declare module 'express-session' {
    interface SessionData {
        sub: string;
        role: string;
    }
}

mongodb().then(_ =>
    console.log(`
        |---------------------------------------|
        |  Connection to mongoDb successfully!  |
        |---------------------------------------|
    `)
).catch(e => new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500));

redis().then(_ =>
    console.log(`
        |---------------------------------------|
        |  Connection to redis successfully!    |
        |---------------------------------------|
    `)
).catch(e => new AppError(e.message ? e.message : e, e.statusCode ? e.statusCode : 500));

app.set('port', port);

if (process.env['NODE_ENV'] === 'production') {
    app.set('trust proxy', 1);
}

app.use(cookieParser());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "https://express-redis.didiamuri.dev"],
        }
    }
}));
app.use(cors);
app.use(session);
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/v1', routes);
app.use('*', badUrl);
app.use(errorHandler);

server.listen(port, () =>
    console.log(`
        |---------------------------------------|
        |  Server is running on port ${port}       |
        |---------------------------------------|
    `)
);

export default app;