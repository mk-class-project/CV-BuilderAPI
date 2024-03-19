import express from 'express';
import { createResume, editResume } from '../controllers/cv.controller.js';

const router = express.Router();

router.post('/cv', createResume);
router.put('/cv/:id', editResume);

export default router;
