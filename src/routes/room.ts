import express from 'express';
import { createRoom, endRoom, getLiveRooms } from '../controllers/roomController';

const router = express.Router();

router.post('/', createRoom);
router.post('/:roomId/end', endRoom);
router.get('/live', getLiveRooms);

export default router;
