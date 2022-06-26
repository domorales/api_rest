import { NextFunction, request, response } from 'express';
import { inject, singleton } from 'tsyringe';

import LoginUserCase from '../../../core/auth/aplication/useCases/LoginUseCase';

@singleton()
export default class UserLoginController {
	constructor(@inject('LoginUserCase') private loginUserCase: LoginUserCase) {}

	async loginDefault(req = request, res = response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const token = await this.loginUserCase.execute(email, password);
			res.status(200).json({ token });
		} catch (error) {
			next(error);
		}
	}
}

// const loginExternal = async (req = request, res = response) => {
// 	try {
// 		const { id_token } = req.body;
// 		const { type } = req.params;
// 		const instanceCase = containerGlobal.resolve(LoginOrquestetor);
// 		const { user, token } = await instanceCase.exec(id_token, type);
// 		res.status(200).json({ user, token });
// 	} catch (error) {
// 		returnServerError(res, error);
// 	}
// };
