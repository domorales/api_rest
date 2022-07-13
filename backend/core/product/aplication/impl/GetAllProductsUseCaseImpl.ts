import { inject, singleton } from 'tsyringe';

import IProductRepository from '../../domain/port/IProductRepository';
import Product from '../../domain/Product';
import { GetAllProductsUseCase } from '../useCases';

@singleton()
export default class GetAllProductsUseCaseImpl implements GetAllProductsUseCase {
	constructor(@inject('ProductRepository') private repository: IProductRepository) {}
	public async execute(limit: number): Promise<Product[]> {
		return await this.repository.getAll(limit);
	}
}
