import { inject, singleton } from 'tsyringe';

import IUserResposotory from '../../domain/ports/IUserRepository';
import User from '../../domain/User';
import { GetUserUseCase } from '../useCases';

@singleton()
export default class GetUserUseCaseImpl implements GetUserUseCase {
	constructor(@inject('UserRepository') private repository: IUserResposotory) {}
	async execute(id: string): Promise<User> {
		const userResult = await this.repository.getByID(id);
		return userResult;
	}
}
