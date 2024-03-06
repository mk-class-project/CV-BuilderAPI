import express from 'express';
import { createResume, editResume } from '../controllers/cv.controller.js';

const router = express.Router();

router.post('/resumes', createResume);
router.put('/resumes/:id', editResume);

export default router;
