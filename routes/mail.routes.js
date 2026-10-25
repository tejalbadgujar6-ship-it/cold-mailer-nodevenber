import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { deleteEmail, generateEmails, getEmailById, getMyEmails, updateEmail } from '../controller/mail.controller';
import { sendEmail } from '../services/email.service';

const router = express.Router();

router.post('/generate',authMiddleware,generateEmails);
router.get('/',authMiddleware,getMyEmails);
router.get('/:id',authMiddleware,getEmailById);
router.get('/:id',authMiddleware,updateEmail);
router.post('/:id',authMiddleware,deleteEmail);
router.get('/send',authMiddleware,sendEmail);

export default router;
