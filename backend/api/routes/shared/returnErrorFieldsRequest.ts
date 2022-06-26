import { request, response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const returnErrorFieldsRequest = (req = request, res = response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json(errors);
	next();
};

export default returnErrorFieldsRequest;
