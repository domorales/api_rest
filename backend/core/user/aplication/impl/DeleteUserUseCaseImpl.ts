import { inject, singleton } from 'tsyringe';

import IUserResposotory from '../../domain/ports/IUserRepository';
import { DeleteUserUseCase } from '../useCases';

@singleton()
export default class DeleteUserUseCaseImpl implements DeleteUserUseCase {
	constructor(@inject('UserRepository') private repository: IUserResposotory) {}
	async execute(id: string): Promise<void> {
		await this.repository.delete(id);
	}
}
