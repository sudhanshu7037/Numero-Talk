import express from 'express';
import { handleContactSubmit } from '../controllers/contactController.js';

const router = express.Router();

// Route for handling contact page submissions - mounted at /api/contact
router.post('/', handleContactSubmit);

export default router;
