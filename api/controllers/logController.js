import {
	writeLog,
	fetchLogs
} from '../models/logModel.js';

const UNKNOWN_ERROR = {
	message: `UNKNOWN_ERROR`,
	errorCode: 1
}

export async function createLog(req, res) {
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
		console.error('in readlogs');
		res.status(401);
		result.message = `Erreur ${error}`;
		result.errorCode = 9055;
	}

	res.formatView(result);
}