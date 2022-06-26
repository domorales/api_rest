import { NextFunction, request, response } from 'express';
import { inject, singleton } from 'tsyringe';

import {
	CreateProductUseCase,
	DeleteProductUseCase,
	GetAllProductsUseCase,
	GetProductByIDUseCase,
	UpadateImageProductUseCase,
	UpdateProductUseCase,
} from '../../../core/product/aplication/useCases';
import { pathTmp } from '../../../services/upload/utils';
import { toDomainProductEntity, toProductDTO } from './converts';

@singleton()
export default class ProductController {
	constructor(
		@inject('GetProductByIDUseCase')
		private getProductByIDUseCase: GetProductByIDUseCase,
		@inject('GetAllProductsUseCase')
		private getAllProductsUseCase: GetAllProductsUseCase,
		@inject('CreateProductUseCase')
		private createProductUseCase: CreateProductUseCase,
		@inject('UpdateProductUseCase')
		private updateProductUseCase: UpdateProductUseCase,
		@inject('DeleteProductUseCase')
		private deleteProductUseCase: DeleteProductUseCase,
		@inject('UpadateImageProductUseCase')
		private upadateImageProductUseCase: UpadateImageProductUseCase
	) {}

	async getProduct(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			const result = await this.getProductByIDUseCase.execute(id);
			res.status(200).json(toProductDTO(result));
		} catch (error) {
			next(error);
		}
	}

	async getAllProducts(req = request, res = response, next: NextFunction) {
		try {
			const { limit } = req.query;
			const results = await this.getAllProductsUseCase.execute(Number(limit));
			res.status(201).json({ products: results.map((product) => toProductDTO(product)) });
		} catch (error) {
			next(error);
		}
	}

	async postProduct(req = request, res = response, next: NextFunction) {
		try {
			const product = req.body;
			const uid = res.locals.uid;
			product.user = uid;
			const result = await this.createProductUseCase.execute(toDomainProductEntity(product));
			res.status(201).json(toProductDTO(result));
		} catch (error) {
			next(error);
		}
	}

	async putProduct(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			const result = await this.updateProductUseCase.execute(
				id,
				toDomainProductEntity(req.body)
			);
			res.status(200).json(toProductDTO(result));
		} catch (error) {
			next(error);
		}
	}

	async putImageProduct(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params,
				files = req.files;

			const patTmp = await pathTmp(files);
			await this.upadateImageProductUseCase.execute(id, patTmp);
			res.json({ message: 'SUBIO CON EXITO' });
		} catch (error) {
			next(error);
		}
	}

	async deleteProduct(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			await this.deleteProductUseCase.execute(id);
			res.status(200).json({ message: 'Eliminado con exito' });
		} catch (error) {
			next(error);
		}
	}
}
