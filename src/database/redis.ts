import { createClient } from "redis";

export const redisClient = createClient({
    url: process.env['REDIS_URI']
});

const redis = async () => {
    return new Promise((resolve, reject) => {
        redisClient.connect().then(resolve).catch(e => reject(e));
    })
}

export default redis;