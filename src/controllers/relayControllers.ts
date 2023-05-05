import { Request, Response } from 'express';
import { sendMqttMessage } from '../mqtt/mqtt';
import createPool from '../config/db';

interface RoutineError {
  routine: string;
}

const pool = createPool();

const getAllRelays = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM relays');
    const metadata = { count: result.rows.length };
    res.status(200).json({ data: result.rows, metadata: metadata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRelayById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(`SELECT * FROM relays WHERE id=${id}`);
    if (result.rowCount) {
      const metadata = { count: result.rows.length };
      res.status(200).json({ data: result.rows[0], metadata: metadata });
    } else {
      res.status(404).json({ message: `Relay with id: ${id} does not exist` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const postRelay = async (req: Request, res: Response) => {
  const { deviceTypeId, name, topic } = req.body;

  if (!deviceTypeId || !name || !topic) {
    return res.status(400).json({ message: 'deviceTypeId, name and topic are required' });
  }

  try {
    const insertRelayQuery = `INSERT INTO relays (deviceTypeId, name, topic) VALUES($1, $2, $3) RETURNING id`;
    const result = await pool.query(insertRelayQuery, [deviceTypeId, name, topic]);
    res.status(201).json({ id: result.rows[0].id, deviceTypeId, name });
  } catch (error) {
    if ((error as RoutineError).routine === '_bt_check_unique') {
      console.log('Duplicate relay error');
      res.status(500).json({ message: 'A relay with this info already exists' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

const updateRelay = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { deviceTypeId, name, topic, state } = req.body;

  try {
    const setParams = [];
    const setValues = [];

    if (deviceTypeId) {
      setParams.push(`deviceTypeId = $${setValues.length + 1}`);
      setValues.push(deviceTypeId);
    }
    if (name) {
      setParams.push(`name = $${setValues.length + 1}`);
      setValues.push(name);
    }
    if (topic) {
      setParams.push(`topic = $${setValues.length + 1}`);
      setValues.push(topic);
    }
    if (state) {
      setParams.push(`state = $${setValues.length + 1}`);
      setValues.push(state);
    }

    const setClause = setParams.join(', ');

    const updateRelayQuery = `
UPDATE relays
SET ${setClause}
WHERE id = $${setValues.length + 1}
RETURNING *

`;
    const result = await pool.query(updateRelayQuery, [...setValues, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: `Relay with id: ${id} does not exist` });
    }
    if (state) {
      try {
        const getRelayMqttTopic = `SELECT topic FROM relays WHERE id=${id}`;
        const result = await pool.query(getRelayMqttTopic, []);
        sendMqttMessage(result.rows[0].topic, state);
      } catch (error) {
        console.error(error);
      }
    }
    res.json(result.rows[0]);
  } catch (error) {
    if ((error as RoutineError).routine === '_bt_check_unique') {
      console.log('Duplicate relay error');
      res.status(500).json({ message: 'A relay with this info already exists' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

const deleteRelay = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(`DELETE FROM relays WHERE id=$1`, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: `Relay with id ${id} does not exist` });
    }

    res.json({ message: `Relay with id: ${id} was deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getAllRelays, getRelayById, postRelay, updateRelay, deleteRelay };
