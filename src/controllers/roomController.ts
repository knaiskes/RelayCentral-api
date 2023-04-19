import { Request, Response } from 'express';
import createPool from '../config/db';

const pool = createPool();

const getAllRooms = async(req: Request, res: Response ) => {
    try {
	const result = await pool.query('SELECT * FROM rooms');
	const metadata = { count: result.rows.length };
	res.status(200).json({ data: result.rows, metadata: metadata });
    } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Server error' });
    }
};

const getRoomById = async(req: Request, res: Response ) => {
    const id = parseInt(req.params.id);

    try {
	const result = await pool.query(`SELECT * FROM rooms WHERE id=${id}`);
	if(result.rowCount) {
	    const metadata = { count: result.rows.length };
	    res.status(200).json({ data: result.rows[0], metadata: metadata });
	} else {
	    res.status(404).json({ message: `Room with id: ${id} does not exist`});
	}
    } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Server error' });
    }
};

const postRoom = async(req: Request, res: Response ) => {
    const { name, userId } = req.body;

    if(!name || !userId) {
	return res.status(400).json({ message: 'name and userId are required'});
    }

    try {
	const insertRoomyQuery =
	    `INSERT INTO rooms (name, userId) VALUES($1, $2) RETURNING id`;
	const result = await pool.query(insertRoomyQuery, [name, userId]);
	res.status(201).json({ id: result.rows[0].id, name, userId});
    } catch(error) {
	console.error(error);
	res.status(500).json({ message: 'Server error' });
    }
};

export {
    getAllRooms,
    getRoomById,
    postRoom,
};
