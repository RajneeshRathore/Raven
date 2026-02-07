import {Router} from 'express';
import { sendDMMessage,getDMMessages } from '../controllers/dmMessage.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = Router();

router.post("/:userId", authMiddleware, sendDMMessage);
router.get("/:userId/messages", authMiddleware, getDMMessages);


export default router;