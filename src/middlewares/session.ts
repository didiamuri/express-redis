import session from "express-session";
import RedisStore from "connect-redis";
import { redisClient } from "@src/database/redis";

export default session({
    resave: false,
    name: "sessionId",
    rolling: true,
    saveUninitialized: false,
    secret: process.env['SESSION_SECRET_KEY'],
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env['NODE_ENV'] === 'production' ? true : false,
        sameSite: process.env['NODE_ENV'] === 'production' ? 'none' : 'lax'
    },
    store: new RedisStore({
        client: redisClient,
        ttl: 24 * 60 * 60 * 1000
    })
});