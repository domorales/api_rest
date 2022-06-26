import { inject, singleton } from 'tsyringe';

import IProductRepository from '../../domain/port/IProductRepository';
import Product from '../../domain/Product';
import { UpdateProductUseCase } from '../useCases';

@singleton()
export default class UpdateProducttUseCaseImpl implements UpdateProductUseCase {
	constructor(@inject('ProductRepository') private repository: IProductRepository) {}
	public async execute(id: string, product: Product): Promise<Product> {
		const productUpdate = await this.repository.update(id, product);
		return productUpdate;
	}
}
