import { inject, singleton } from 'tsyringe';

import Category from '../../domain/Category';
import ICategoryRepository from '../../domain/port/ICategoryRepository';
import { DeleteCategoryUseCase } from '../useCases';

@singleton()
export default class DeleteCategoryUseCaseImpl implements DeleteCategoryUseCase {
	constructor(@inject('CategoryRepository') private repository: ICategoryRepository) {}
	async execute(id: string): Promise<Category> {
		const category = await this.repository.delete(id);
		return category;
	}
}
