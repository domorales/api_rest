import { inject, singleton } from 'tsyringe';

import IProductRepository from '../../domain/port/IProductRepository';
import Product from '../../domain/Product';
import { GetProductByIDUseCase } from '../useCases';

@singleton()
export default class GetProductByIDUseCaseImpl implements GetProductByIDUseCase {
	constructor(@inject('ProductRepository') private repository: IProductRepository) {}
	public async execute(id: string): Promise<Product> {
		const product = await this.repository.getByIDPopulate(id);
		return product;
	}
}
