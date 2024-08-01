import express from 'express';
import UserController from '@src/server/controllers/user';

const router = express.Router();

router.post('/register', UserController.create);
router.post('/authenticate', UserController.authenticate);

export default router;