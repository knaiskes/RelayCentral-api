import express, { Application } from 'express';

import relayRoutes from './routes/relayRoutes';

const app: Application = express();
app.use(express.json());
const port: number = 3000;

const version: string = '/api/v1'

app.use(version, relayRoutes);

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
