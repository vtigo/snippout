import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:id', userController.get);

router.post('/', userController.create);

router.patch('/:id', userController.update);

router.delete('/:id', userController.remove);

export default router;