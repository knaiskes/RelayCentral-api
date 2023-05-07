import express, { Application } from 'express';

import relayRoutes from './routes/relayRoutes';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import deviceTypes from './routes/deviceTypesRoutes';

const app: Application = express();
app.use(express.json());

const hostname = process.env.API_HOSTNAME as string;
const port = Number(process.env.API_PORT);

const version = '/api/v1';

app.use(version, relayRoutes);
app.use(version, userRoutes);
app.use(version, roomRoutes);
app.use(version, deviceTypes);

app.listen(port, hostname, () => {
    console.log(`Connected successfully on port ${hostname} : ${port}`);
});
