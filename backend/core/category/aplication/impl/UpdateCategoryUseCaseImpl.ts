import { inject, singleton } from 'tsyringe';

import Category from '../../domain/Category';
import ICategoryRepository from '../../domain/port/ICategoryRepository';
import { UpdateCategoryUseCase } from '../useCases';

@singleton()
export default class UpdateCategoryUseCaseImpl implements UpdateCategoryUseCase {
	constructor(@inject('CategoryRepository') private repository: ICategoryRepository) {}
	async execute(id: string, category: Category): Promise<Category> {
		const categoryUpdate = await this.repository.update(id, category);
		return categoryUpdate;
	}
}
