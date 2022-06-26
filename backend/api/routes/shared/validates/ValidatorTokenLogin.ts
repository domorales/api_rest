import { NextFunction, request, response } from 'express';
import { inject, singleton } from 'tsyringe';

import { AutorizationException } from '../../../../config/exception/AutorizationException';
import ILoginValidator from '../../../../services/loginValidator/ILoginValidator';
import { GetUserUseCase } from '../../../../core/user/aplication/useCases';

@singleton()
export default class ValidatorTokenLogin {
	constructor(
		@inject('GetUserUseCase') private getUserUseCase: GetUserUseCase,
		@inject('ILoginValidator') private loginValidator: ILoginValidator
	) {}
	async validate(req = request, res = response, next: NextFunction) {
		const token = req.header('x-token');
		if (!token) return res.status(401).json({ message: 'No esta autorizado' });
		try {
			const uid = await this.loginValidator.verifyToken(token);
			const user = await this.getUserUseCase.execute(uid);
			res.locals.uid = uid;
			res.locals.user = user;
			next();
		} catch (error) {
			next(new AutorizationException('No esta autorizado'));
		}
	}
}
