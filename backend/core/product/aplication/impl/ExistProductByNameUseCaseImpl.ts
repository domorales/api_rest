import { inject, singleton } from 'tsyringe';

import IProductRepository from '../../domain/port/IProductRepository';
import { ExistProductByNameUseCase } from '../useCases';

@singleton()
export default class ExistProductByNameImpl implements ExistProductByNameUseCase {
	constructor(@inject('ProductRepository') private repository: IProductRepository) {}
	public async execute(name: string): Promise<boolean> {
		const result = await this.repository.existByName(name);
		return result;
	}
}
