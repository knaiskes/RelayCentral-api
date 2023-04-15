import { Request, Response } from 'express';
import createPool from '../config/db'

const pool = createPool();

const getAllRelays = async(req: Request, res: Response ) => {
    try {
	const result = await pool.query('SELECT * FROM relays');
	const metadata = { count: result.rows.length };
	res.status(200).json({ data: result.rows, metadata: metadata });
    } catch (err: any) {
	console.error('There has been an error: ', err.stack);
    }
};

const getRelayById = async(req: Request, res: Response ) => {
    const { id } = req.params;

    try {
	const result = await pool.query(`SELECT * FROM relays WHERE id=${id}`);
	if(result.rowCount) {
	    const metadata = { count: result.rows.length };
	    res.status(200).json({ data: result.rows[0], metadata: metadata });
	} else {
	    res.status(404).json({ message: 'Data not found' });
	}
    } catch (err: any) {
	console.error('There has been an error: ', err.stack);
    }
};

export {
    getAllRelays,
    getRelayById,
};
