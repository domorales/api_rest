import { inject, singleton } from 'tsyringe';

import {
	GetCategoryByIDUseCase,
	GetCategoryByNameUseCase,
} from '../../../core/category/aplication/useCases';

@singleton()
export default class CategoryCustomValidationFields {
	constructor(
		@inject('GetCategoryByIDUseCase') private getCategoryByIDUseCase: GetCategoryByIDUseCase,
		@inject('GetCategoryByNameUseCase')
		private GetCategoryByNameUseCase: GetCategoryByNameUseCase
	) {}

	async notExistNameCategory(name: string) {
		const category = await this.GetCategoryByNameUseCase.execute(name);
		if (!category) throw new Error('Categoria con el nombre no existe');
		return true;
	}

	async existNameCategory(name: string) {
		const category = await this.GetCategoryByNameUseCase.execute(name);
		if (!category) throw new Error('Categoria con el nombre no existe');
		return true;
	}

	async validateExistIDCategory(id: string) {
		const category = await this.getCategoryByIDUseCase.execute(id);
		if (!category) throw new Error('Categoria con el id no existe');
		return true;
	}
}
