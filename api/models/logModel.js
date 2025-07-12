import cassandra from 'cassandra-driver';

const client = new cassandra.Client({
	contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || 'cassandra'],
	localDataCenter: 'datacenter1',
	keyspace: 'logsystem'
});

await client.connect();

export async function writeLog(log) {
	const query = `
		INSERT INTO logs (id, timestamp, level, description, module, file, line)
			VALUES(uuid(), toTimestamp(now()), ?, ?, ?, ?, ?)
	`;

	const params = [log.level, log.description, log.module, log.file, log.line];

	const result = await client.execute(query, params, { prepare: true});
	return result
}

export async function fetchLogs() {
	// const query = `SELECT * FROM logs WHERE level = 'ERRBACKEND' ALLOW FILTERING;`;
	const query = `SELECT * FROM logs`;
	const result = await client.execute(query);
	return result.rows;
}

export async function doBogus() {
	const query = `
		INSERT INTO logs (id, timestamp, level, description, module, file, line)
			VALUES(uuid(), toTimestamp(now()), 'bogus', 'bogus', 'bogus', 'bogus', 420)
	`;

// use this for backend error	
	// const query = `
	// 	INSERT INTO logs (id, timestamp, level, description, module, file, line)
	// 		VALUES(uuid(), toTimestamp(now()), 'bogus', 'bogus', 'bogus', 'bogus', 'error')
	// `;

	const result = await client.execute(query);
	return result
}