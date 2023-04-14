import express from 'express';

import { getAllRelays } from '../controllers/relayControllers'

const router = express.Router();

router.get('/relays', getAllRelays);

export default router;
