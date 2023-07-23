import express, { Application } from 'express';

import relayRoutes from './routes/relayRoutes';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import deviceTypes from './routes/deviceTypesRoutes';
import tokensRoutes from './routes/tokensRoutes';

import { verifyToken } from './middleware/authMiddleware';

const app: Application = express();
import cors from 'cors';

app.use(express.json());

const corsOptions = {
    origin: process.env.ORIGIN_URL,
    credentials: true,
};

app.use(cors(corsOptions));

const hostname = process.env.API_HOSTNAME as string;
const port = Number(process.env.API_PORT);

const version = '/api/v1';

app.use(version, verifyToken, relayRoutes);
app.use(version, userRoutes);
app.use(version, roomRoutes);
app.use(version, deviceTypes);
app.use(version, tokensRoutes);

app.listen(port, hostname, () => {
  console.log(`Connected successfully on port ${hostname} : ${port}`);
});
