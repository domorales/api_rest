import { inject, singleton } from 'tsyringe';

import IUserResposotory from '../../domain/ports/IUserRepository';
import User from '../../domain/User';
import { UpdateUserUseCase } from '../useCases';

@singleton()
export default class UpdateUserUseCaseImpl implements UpdateUserUseCase {
	constructor(@inject('UserRepository') private repository: IUserResposotory) {}

	async execute(id: string, user: User): Promise<User> {
		const userResult = await this.repository.update(id, user);
		return userResult;
	}
}
