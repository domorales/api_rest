import { inject, singleton } from 'tsyringe';

import IProductRepository from '../../domain/port/IProductRepository';
import Product from '../../domain/Product';
import { CreateProductUseCase } from '../useCases';

@singleton()
export default class CreateProductUseCaseImpl implements CreateProductUseCase {
	constructor(@inject('ProductRepository') private repository: IProductRepository) {}
	public async execute(product: Product): Promise<Product> {
		const productCreate = await this.repository.create(product);
		return productCreate;
	}
}
