import express, { Application, Request, Response } from 'express';

import relayRoutes from './routes/relayRoutes';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import deviceTypes from './routes/deviceTypesRoutes';
import loginRoutes from './routes/loginRoutes';

import { verifyToken } from './middleware/authMiddleware';

const app: Application = express();
app.use(express.json());

const hostname = process.env.API_HOSTNAME as string;
const port = Number(process.env.API_PORT);

const version = '/api/v1';

app.use(version, verifyToken, relayRoutes);
app.use(version, userRoutes);
app.use(version, roomRoutes);
app.use(version, deviceTypes);
app.use(version, loginRoutes);

app.listen(port, hostname, () => {
    console.log(`Connected successfully on port ${hostname} : ${port}`);
});
