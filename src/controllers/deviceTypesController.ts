import { Request, Response } from 'express';
import createPool from '../config/db';

const pool = createPool();

const getAllDeviceTypes = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM device_types');
    const metadata = { count: result.rows.length };
    res.status(200).json({ data: result.rows, metadata: metadata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDeviceTypeById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(`SELECT * FROM device_types WHERE id=${id}`);
    if (result.rowCount) {
      const metadata = { count: result.rows.length };
      res.status(200).json({ data: result.rows[0], metadata: metadata });
    } else {
      res.status(404).json({ message: `Device type with id: ${id} does not exist` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const postDeviceType = async (req: Request, res: Response) => {
  const { text, userId } = req.body;

  if (!text || !userId) {
    return res.status(400).json({ message: 'text and userId are required' });
  }

  try {
    const insertDeviceTypeQuery = `INSERT INTO device_types (text, userId) VALUES($1, $2) RETURNING id`;
    const result = await pool.query(insertDeviceTypeQuery, [text, userId]);
    res.status(201).json({ id: result.rows[0].id, text, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateDeviceType = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { text, userId } = req.body;

  try {
    const setParams = [];
    const setValues = [];

    if (text) {
      setParams.push(`text = $${setValues.length + 1}`);
      setValues.push(text);
    }
    if (userId) {
      setParams.push(`userId = $${setValues.length + 1}`);
      setValues.push(userId);
    }

    const setClause = setParams.join(', ');

    const updateDeviceTypeQuery = `
UPDATE device_types
SET ${setClause}
WHERE id = $${setValues.length + 1}
RETURNING *

`;
    const result = await pool.query(updateDeviceTypeQuery, [...setValues, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: `Device type with id: ${id} does not exist` });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteDeviceType = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(`DELETE FROM device_types WHERE id=$1`, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: `Device type with id ${id} does not exist` });
    }

    res.json({ message: `Device type with id: ${id} was deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getAllDeviceTypes, getDeviceTypeById, postDeviceType, updateDeviceType, deleteDeviceType };
