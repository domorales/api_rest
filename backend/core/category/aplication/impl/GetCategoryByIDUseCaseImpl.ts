import { inject, singleton } from 'tsyringe';

import Category from '../../domain/Category';
import ICategoryRepository from '../../domain/port/ICategoryRepository';
import { GetCategoryByIDUseCase } from '../useCases';

@singleton()
export default class GetCategoryByIDUseCaseImpl implements GetCategoryByIDUseCase {
	constructor(@inject('CategoryRepository') private repository: ICategoryRepository) {}
	async execute(id: string): Promise<Category> {
		const category = await this.repository.getByID(id);
		return category;
	}
}
