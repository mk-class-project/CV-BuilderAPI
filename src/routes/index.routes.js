import express from 'express';
import userRoutes from './user.routes.js';
// import cvRoutes from './cv.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
// router.use('/cv', cvRoutes);

export default router;