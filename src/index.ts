import express, { Application, Request, Response } from 'express';
import createPool from './config/db';

const pool = createPool();

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello World!');
});

app.get('/relays', async(req: Request, res: Response ) => {
    try {
	const result = await pool.query('SELECT * FROM relays');
	const metadata = { count: result.rows.length };
	res.status(200).json({ data: result.rows, metadata: metadata });
    } catch (err: any) {
	console.error('There has been an error: ', err.stack);
    }
});

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
