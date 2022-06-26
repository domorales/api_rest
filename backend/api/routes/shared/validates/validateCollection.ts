import mongoose from 'mongoose';

import { Execption404 } from '../../../../config/exception/Execption404';

const validateCollection = async (collection: string): Promise<boolean> => {
	const collections = Object.keys(await mongoose.connection.collections);
	if (collections.includes(collection)) return true;
	throw new Execption404('No existe en la collecion');
};

export default validateCollection;
