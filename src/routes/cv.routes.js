import express from 'express';
import { verifyToken } from '../middlewares/jwt.middleware.js';
import { createCV, updateCV, getUserCVs } from '../controllers/cv.controller.js';

const router = express.Router();

router.post('/:userId', verifyToken, createCV);
router.put('/:cvId', verifyToken, updateCV);
router.get('/:userId', verifyToken, getUserCVs);

export default router;
