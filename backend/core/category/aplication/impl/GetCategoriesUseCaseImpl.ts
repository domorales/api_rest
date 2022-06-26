import { inject, singleton } from 'tsyringe';

import Category from '../../domain/Category';
import ICategoryRepository from '../../domain/port/ICategoryRespository';
import { GetCategoriesUseCase } from '../useCases';

@singleton()
export default class GetCategoriesUseCaseImpl implements GetCategoriesUseCase {
	constructor(@inject('CategoryRepository') private repository: ICategoryRepository) {}
	async execute(limit: number = 5): Promise<{ total: number; categories: Category[] }> {
		return await this.repository.getAll(limit);
	}
}
