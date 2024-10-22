import mongoose from 'mongoose';
import ENV from '../utils/env.js';

// General container

mongoose.set('strictQuery', false);
const connectDb = async () => {
	try {
		const conn = await mongoose.connect(ENV.DB_URL, {});
		console.log(
			`\x1b[31m%s\x1b[0m`,
			`DB: MongoDB Connected: ${conn.connection.host}`,
		);
	} catch (error) {
		console.log(
			`\x1b[31m%s\x1b[0m`,
			`DB: MongoDB Conn Failure: ${error.message}`,
		);
		process.exit(1);
	}
};

export { connectDb };