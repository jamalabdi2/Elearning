import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getCoursesAnalytics, getOrderAnalytics, getUserAnalytics } from '../controllers/analytics.controller';
const analyticsRouter = express.Router();


analyticsRouter.get('/users', isAuthenticated,authorizeRoles("admin"),getUserAnalytics);
analyticsRouter.get('/courses', isAuthenticated,authorizeRoles("admin"),getCoursesAnalytics);
analyticsRouter.get('/orders', isAuthenticated,authorizeRoles("admin"),getOrderAnalytics);

export default analyticsRouter;