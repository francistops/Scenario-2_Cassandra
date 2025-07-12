import {
	writeLog,
	fetchLogs,
	doBogus
} from '../models/logModel.js';

const UNKNOWN_ERROR = {
	message: `UNKNOWN_ERROR`,
	errorCode: 1
}

export async function createLog(req, res) {
	console.log('in createLog');
	const log = req.body;
	let result = UNKNOWN_ERROR;
	
	
	try {
		await writeLog(log);
		result = {
			message: 'Success',
			errorCode: 0
		};
	} catch (error) {
		// sauf ici - LOG PAS ICI
		res.status(401);
		result.message = `Erreur ${error}`;
		result.errorCode = 9055;
	}

	res.formatView(result);
}

export async function readLogs(req, res) {
	console.log('in readLogs');
	
	let result = UNKNOWN_ERROR;


	try {
		const logs = await fetchLogs();
		result = {
			message: 'Success',
			errorCode: 0,
			logs: logs
		};
	} catch (error) {
		// sauf ici - LOG PAS ICI
		console.error('error in readlogs');
		res.status(401);
		result.message = `Erreur ${error}`;
		result.errorCode = 9055;
	}

	res.formatView(result);
}

export async function testBogus(req, res) {
	const log = req.body;
	let result = UNKNOWN_ERROR;


	try {
		await doBogus();
		result = {
			message: 'Success',
			errorCode: 0
		};
	} catch (error) {
		log.level = 'ERRBACKEND'
		await writeLog(log)
	}

	res.formatView(result);
}