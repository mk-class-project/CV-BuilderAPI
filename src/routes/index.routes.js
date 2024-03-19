import express from 'express';
import userRoutes from './user.routes.js';
import loginRoutes from './login.routes.js';
// import cvRoutes from './cv.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/login', loginRoutes);
// router.use('/cv', cvRoutes);

export default router;