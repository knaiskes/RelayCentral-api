import express from 'express';

import {
    getAllRooms,
    getRoomById,
    postRoom,
    updateRoom,
} from '../controllers/roomController'

const router = express.Router();

router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getRoomById);
router.post('/rooms', postRoom);
router.patch('/rooms/:id', updateRoom);

export default router;
