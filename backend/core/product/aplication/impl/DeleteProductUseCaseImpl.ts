import { inject, singleton } from 'tsyringe';

import IProductRepository from '../../domain/port/IProductRepository';
import { DeleteProductUseCase } from '../useCases';

@singleton()
export default class DeleteProductUseCaseImpl implements DeleteProductUseCase {
	constructor(@inject('ProductRepository') private repository: IProductRepository) {}
	public async execute(id: string): Promise<boolean> {
		const result = await this.repository.delete(id);
		return result;
	}
}
