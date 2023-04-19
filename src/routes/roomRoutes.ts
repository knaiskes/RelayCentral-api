import express from 'express';

import {
    getAllRooms,
    postRoom,
} from '../controllers/roomController'

const router = express.Router();

router.get('/rooms', getAllRooms);
router.post('/rooms', postRoom);

export default router;
