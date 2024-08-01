import express from 'express';
import ProjectController from '@src/server/controllers/project';
import { isAuthenticated } from '@src/middlewares';

const router = express.Router();

router.post('/create', isAuthenticated, ProjectController.create);
router.get('/all', isAuthenticated, ProjectController.findAll);
router.get('/:id', isAuthenticated, ProjectController.findById);
router.put('/:id', isAuthenticated, ProjectController.update);
router.delete('/:id', isAuthenticated, ProjectController.delete);
router.put('/:id/inprogress', isAuthenticated, ProjectController.inProgress);
router.put('/:id/done', isAuthenticated, ProjectController.done);

export default router;