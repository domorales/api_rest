import { inject, singleton } from 'tsyringe';

import {
	ExistProductByNameUseCase,
	GetProductByIDUseCase,
} from '../../../core/product/aplication/useCases';

@singleton()
export default class ProductCustomValidationFields {
	constructor(
		@inject('ExistProductByNameUseCase')
		private existProductByNameUseCase: ExistProductByNameUseCase,
		@inject('GetProductByIDUseCase')
		private getProductByIDUseCase: GetProductByIDUseCase
	) {}

	async validateExistNameProduct(name: string) {
		const result = await this.existProductByNameUseCase.execute(name);
		if (!result) throw new Error('Producto con el nombre enviado ya existe ');
		return true;
	}

	async validateExistIDProduct(id: string) {
		const result = await this.getProductByIDUseCase.execute(id);
		if (!result) throw new Error('Producto con el id enviado no existe ');
		return true;
	}
}
