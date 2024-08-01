import express, { Response } from "express";
import moment from 'moment';

const router = express.Router();

router.route('/').get((_, res: Response) => {
    return res.status(200).json({
        status: 'running...',
        uptime: moment().add(Math.floor(process.uptime()), 'seconds').fromNow(),
        date: moment().format('LLL'),
        version: process.env.npm_package_version,
        node: process.version
    })
});

router.use('/users', require('./user').default);
router.use('/projects', require('./project').default);

export default router;