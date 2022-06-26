import { inject, singleton } from 'tsyringe';

import IEncrypt from '../../../../services/encrypt/IEncrypt';
import IUserResposotory from '../../domain/ports/IUserRepository';
import User from '../../domain/User';
import { CreateUserUseCase } from '../useCases';

@singleton()
export default class CreateUserUseCaseImpl implements CreateUserUseCase {
	constructor(
		@inject('UserRepository') private repository: IUserResposotory,
		@inject('IEncrypt') private encrypt: IEncrypt
	) {}
	async execute(user: User): Promise<User> {
		const passwordEncrypt = await this.encrypt.encrypt(user.password);
		user.changePassword(passwordEncrypt);
		//TODO: IMPLEMENTES REPOSITORY INTERFACE FOR ROL
		//await this.repository.ofExistRolOrFail(user.rol.rol);

		if (await this.repository.existUserByEmail(user.email)) throw new Error('existe');
		const userResult = await this.repository.create(user);
		return userResult;
	}
}
