import { Request, Response } from 'express';
import createPool from '../../config/db';
import { getAllRelays } from '../../controllers/relayControllers';

jest.mock('../../config/db', () => {
    const mockPool = {
	query: jest.fn(),
    };
    return () => mockPool;
});

describe('Test relayControllers', () => {
    let req: Request;
    let res: Response;
    let mockResult: {
	rows: Array<{ id: number; deviceTypeId: number; name: string; topic: string; state: boolean }>;
    };

    beforeEach(() => {
	req = {} as Request;
	res = {
	    json: jest.fn(),
	    status: jest.fn().mockReturnThis(),
	} as unknown as Response;
	mockResult = {
	    rows: [
		{ id: 1, deviceTypeId: 1, name: 'lamp', topic: '/relays/lamp', state: false },
		{ id: 2, deviceTypeId: 1, name: 'church-light', topic: '/relays/church', state: true}
	    ],
	};
    });

    describe('Test getAllRelays', () => {
	beforeEach(() => {
	    (createPool().query as jest.Mock).mockResolvedValue(mockResult);
	});

	afterEach(() => {
	    jest.clearAllMocks();
	});

	it('should retrieve all relays from the database and return them as JSON', async () => {
	    await getAllRelays(req, res);
	    expect(createPool().query).toHaveBeenCalledWith('SELECT * FROM relays');
	    expect(res.status).toHaveBeenCalledWith(200);
	    expect(res.json).toHaveBeenCalledWith({
		data: mockResult.rows,
		metadata: { count: mockResult.rows.length },
	    });
	});

	it('should return a server error if the database query fails', async () => {
	    const mockError = new Error('Database query error');
	    (createPool().query as jest.Mock).mockRejectedValue(mockError);
	    await getAllRelays(req, res);
	    expect(res.status).toHaveBeenCalledWith(500);
	    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
	});
    });
});
