import express from 'express';
import { registerUser, loginUser, getUserProfile, sendOtp, verifyOtp, sendForgotOtp, resetPassword } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', sendForgotOtp);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', authenticateToken, getUserProfile);

export default router;
