import express from 'express';

import {
    getAllDeviceTypes,
    getDeviceTypeById,
    postDeviceType,
    updateDeviceType,
    deleteDeviceType,
} from '../controllers/deviceTypesController'

const router = express.Router();

router.get('/deviceTypes', getAllDeviceTypes);
router.get('/deviceTypes/:id', getDeviceTypeById);
router.post('/deviceTypes', postDeviceType);
router.patch('/deviceTypes/:id', updateDeviceType);
router.delete('/deviceTypes/:id', deleteDeviceType);

export default router;
