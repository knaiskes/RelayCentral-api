import express from 'express';

import {
    postRoom,
} from '../controllers/roomController'

const router = express.Router();

router.post('/rooms', postRoom);

export default router;
