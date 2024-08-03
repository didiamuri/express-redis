import cors from 'cors';

export default cors({
    origin: ['https://express-redis.didiamuri.dev'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})