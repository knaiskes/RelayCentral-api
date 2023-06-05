import express from 'express';

import { loginController, refreshTokenController } from '../controllers/loginController';

const router = express.Router();

router.post('/login', loginController);
router.post('/refresh-token', refreshTokenController);

export default router;
