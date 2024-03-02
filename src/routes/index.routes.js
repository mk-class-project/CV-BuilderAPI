import express from 'express';
import userRoutes from './user.routes';
import cvRoutes from './cv.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/cv', cvRoutes);

export default router;