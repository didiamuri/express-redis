import cors from 'cors';

export default cors({
    origin: ['https://express-redis-api.didiamuri.dev', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})