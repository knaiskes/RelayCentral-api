import express from 'express';

import { getAllRelays, getRelayById } from '../controllers/relayControllers'

const router = express.Router();

router.get('/relays', getAllRelays);
router.get('/relays/:id', getRelayById);

export default router;
