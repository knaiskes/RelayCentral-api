import express from 'express';

import {
  getAllRooms,
  getRoomById,
  postRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/roomController';

const router = express.Router();

router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getRoomById);
router.post('/rooms', postRoom);
router.patch('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

export default router;
