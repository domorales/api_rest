import { NextFunction, request, response } from 'express';

import { Execption404 } from '../../../config/exception/Execption404';
import GenericException from '../../../config/exception/GenericExecption';
import logger from '../logger/logger';

const error404 = (req = request, res = response, next: NextFunction) => {
	next(new Execption404('Recurso no encontrado'));
};

const errorHandler = (err: any, req: any, res: any, next: NextFunction) => {
	let message = 'Comunicarse con el administrador',
		code = 500,
		stack = '🛰️';

	logger.error(err.stack);
	if (err instanceof GenericException) {
		message = err.message;
		code = err.status;
	}
	if (process.env.NODE_ENV === 'dev') stack = err.stack;

	return res.status(code).json({ code, message, stack });
};

export { error404, errorHandler };
