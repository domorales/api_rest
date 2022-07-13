import { inject, singleton } from 'tsyringe';

import IUserRepository from '../../domain/ports/IUserRepository';
import User from '../../domain/User';
import { GetUsersUseCase } from '../useCases';

@singleton()
export default class GetUsersUseCaseImpl implements GetUsersUseCase {
	constructor(@inject('UserRepository') private repository: IUserRepository) {}
	async execute(limit: number): Promise<{ total: number; users: User[] }> {
		const { total, users } = await this.repository.getAll(limit);
		return { total, users };
	}
}
