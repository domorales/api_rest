import { inject, injectable } from 'tsyringe';

import { GetUserUseCase } from '../../../core/user/aplication/useCases';

@injectable()
export default class UserCustomValidationFields {
	constructor(@inject('GetUserUseCase') private getUserUseCase: GetUserUseCase) {}
	public async validateUserID(id: string) {
		await this.getUserUseCase.execute(id);
		return true;
	}
}
