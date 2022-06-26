import { inject, singleton } from 'tsyringe';

import IUserResposotory from '../../domain/ports/IUserRepository';
import User from '../../domain/User';
import { GetUsersUseCase } from '../useCases';

@singleton()
export default class GetUsersUseCaseImpl implements GetUsersUseCase {
	constructor(@inject('UserRepository') private repository: IUserResposotory) {}
	async execute(limit: number = 5): Promise<{ total: number; users: User[] }> {
		const { total, users } = await this.repository.getAll(limit);
		return { total, users };
	}
}
