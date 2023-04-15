import express from 'express';

import { getAllRelays, getRelayById, postRelay } from '../controllers/relayControllers'

const router = express.Router();

router.get('/relays', getAllRelays);
router.get('/relays/:id', getRelayById);
router.post('/relays', postRelay);

export default router;
