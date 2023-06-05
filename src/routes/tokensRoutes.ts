import express from 'express';

import { getTokenController, refreshTokenController } from '../controllers/tokensController';

const router = express.Router();

router.post('/get-token', getTokenController);
router.post('/refresh-token', refreshTokenController);

export default router;
