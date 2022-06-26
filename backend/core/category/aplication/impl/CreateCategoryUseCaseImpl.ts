import { inject, singleton } from 'tsyringe';

import Category from '../../domain/Category';
import ICategoryRepository from '../../domain/port/ICategoryRespository';
import { CreateCategoryUseCase } from '../useCases';

@singleton()
export default class CreateCategoryUseCaseImpl implements CreateCategoryUseCase {
	constructor(@inject('CategoryRepository') private repository: ICategoryRepository) {}
	async execute(category: Category): Promise<Category> {
		const categoryResult = await this.repository.create(category);
		return categoryResult;
	}
}
