import cors from 'cors';

export default cors({
    origin: ['https://express-redis-api.didiamuri.dev'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})