import express from 'express';
import { verifyToken } from '../middlewares/jwt.middleware.js';
import { getAllUsers, getUserById, createUser, updateUserById, deleteUserById } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', verifyToken, updateUserById);
router.delete('/:id', verifyToken, deleteUserById);

export default router;