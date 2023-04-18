import { Request, Response } from 'express';
import createPool from '../config/db';

const pool = createPool();

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
    postRoom,
};
