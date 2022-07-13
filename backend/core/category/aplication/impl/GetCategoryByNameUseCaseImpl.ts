import { inject, singleton } from 'tsyringe';

import Category from '../../domain/Category';
import ICategoryRepository from '../../domain/port/ICategoryRepository';
import { GetCategoryByNameUseCase } from '../useCases';

@singleton()
export default class GetCategoryByNameUseCaseImpl implements GetCategoryByNameUseCase {
	constructor(@inject('CategoryRepository') private repository: ICategoryRepository) {}
	async execute(name: string): Promise<Category> {
		const category = await this.repository.getByName(name);
		return category;
	}
}
