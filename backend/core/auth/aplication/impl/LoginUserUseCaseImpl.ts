import { inject, singleton } from 'tsyringe';

import IEncrypt from '../../../../services/encrypt/IEncrypt';
import ILoginValidator from '../../../../services/loginValidator/ILoginValidator';
import IUserResposotory from '../../../user/domain/ports/IUserRepository';
import User from '../../../user/domain/User';
import LoginUserCase from '../useCases/LoginUseCase';

@singleton()
export default class LoginUserUseCaseImpl implements LoginUserCase {
	constructor(
		@inject('UserRepository') private repository: IUserResposotory,
		@inject('IEncrypt') private encrypt: IEncrypt,
		@inject('ILoginValidator') private loginvalidator: ILoginValidator
	) {}

	async execute(email: string, password: string): Promise<string> {
		const user = await this.repository.getByEmail(email);
		this.ifStateTrueOrFail(user);
		this.encrypt.validatePasswordOrFailSync(password, user.password);
		const token = await this.loginvalidator.generateToken(user.id);
		return token;
	}

	private ifStateTrueOrFail(userLogin: User) {
		if (!userLogin.state) throw new Error('Usuario deshabilitado');
		return;
	}
}
