import express from 'express';

import {
    getAllRooms,
    getRoomById,
    postRoom,
} from '../controllers/roomController'

const router = express.Router();

router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getRoomById);
router.post('/rooms', postRoom);

export default router;
