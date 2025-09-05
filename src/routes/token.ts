import { Router } from 'express';
import { getToken } from '../controllers/tokenController';
import { tokenRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.get('/getToken', tokenRateLimiter, getToken);

export default router;
