import { inject, singleton } from 'tsyringe';

import IProductRepository from '../../domain/port/IProductRepository';
import { UpadateImageProductUseCase } from '../useCases';

@singleton()
export default class UpadateImageProductUseCaseImpl implements UpadateImageProductUseCase {
	constructor(@inject('ProductRepository') private repository: IProductRepository) {}

	async execute(id: string, path: string): Promise<void> {
		await this.repository.updateImage(id, path);
	}
}
