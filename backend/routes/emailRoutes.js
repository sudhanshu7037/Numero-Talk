import express from 'express';
import { sendReportEmail } from '../controllers/emailController.js';

const router = express.Router();

// Email routes - mounted at /api/send-email
router.post('/', sendReportEmail);

export default router;
