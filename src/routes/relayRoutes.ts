import express from 'express';

import {
    getAllRelays,
    getRelayById,
    postRelay,
    updateRelay
} from '../controllers/relayControllers'

const router = express.Router();

router.get('/relays', getAllRelays);
router.get('/relays/:id', getRelayById);
router.post('/relays', postRelay);
router.patch('/relays/:id', updateRelay);

export default router;
