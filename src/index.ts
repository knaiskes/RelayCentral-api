import express, { Application } from 'express';

import relayRoutes from './routes/relayRoutes';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import deviceTypes from './routes/deviceTypesRoutes';

const app: Application = express();
app.use(express.json());
const port: number = 3000;

const version: string = '/api/v1'

app.use(version, relayRoutes);
app.use(version, userRoutes);
app.use(version, roomRoutes);
app.use(version, deviceTypes);

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});

export default app;
