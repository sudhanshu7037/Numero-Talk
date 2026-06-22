import express from 'express';
import { saveReport, listReports, deleteReport } from '../controllers/reportController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All report routes are protected
router.use(authenticateToken);

router.post('/', saveReport);
router.get('/', listReports);
router.delete('/:id', deleteReport);

export default router;
