import express from 'express';

import {
    getAllRelays,
    getRelayById,
    postRelay,
    updateRelay,
    deleteRelay,
} from '../controllers/relayControllers'

const router = express.Router();

router.get('/relays', getAllRelays);
router.get('/relays/:id', getRelayById);
router.post('/relays', postRelay);
router.patch('/relays/:id', updateRelay);
router.delete('/relays/:id', deleteRelay);

export default router;
