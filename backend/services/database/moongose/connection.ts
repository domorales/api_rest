import mongoose from 'mongoose';

import logger from '../../../api/middleware/logger/logger';

const mongooseConnection = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGODB_CNN || '3000');
		logger.info('mongoDB SUCESS CONECCTION');
	} catch (error) {
		logger.error(error);
		logger.error('mongoDB FAIL CONECCTION');
	}
};

export default mongooseConnection;
