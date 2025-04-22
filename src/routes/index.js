import { Router } from 'express';
import courseRoutes from '../modules/course/course.route.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
  });
});

router.use('/courses', courseRoutes);

export default router;
