import express from 'express';
import { sendGift } from '../controllers/giftController';

const router = express.Router();

router.post('/', sendGift);

export default router;
