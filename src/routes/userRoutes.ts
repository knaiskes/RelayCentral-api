import express from 'express';

import { postUser } from '../controllers/userController';

const router = express.Router();

router.post('/users', postUser);

export default router;
