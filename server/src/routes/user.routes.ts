import express from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', userController.getAll);

router.get('/:id', userController.get);

router.post('/', userController.create);

router.patch('/:id', userController.update);

router.delete('/:id', userController.remove);

export default router;