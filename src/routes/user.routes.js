import express from 'express';
import verifyToken from '../middlewares/jwt.middleware';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', verifyToken, UserController.updateUserById);
router.delete('/:id', verifyToken, UserController.deleteUserById);

export default router;