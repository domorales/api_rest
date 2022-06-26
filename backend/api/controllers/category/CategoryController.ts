import { NextFunction, request, response } from 'express';
import { inject, singleton } from 'tsyringe';

import {
	CreateCategoryUseCase,
	DeleteCategoryUseCase,
	GetCategoriesUseCase,
	GetCategoryByIDUseCase,
	UpdateCategoryUseCase,
} from '../../../core/category/aplication/useCases';
import { toCategoryDTO, toDomainEntity } from './converts';

@singleton()
export default class CategoryController {
	constructor(
		@inject('GetCategoryByIDUseCase') private getCategoryByIDUseCase: GetCategoryByIDUseCase,
		@inject('GetCategoriesUseCase') private getCategoriesUseCase: GetCategoriesUseCase,
		@inject('CreateCategoryUseCase') private createCategoryUseCase: CreateCategoryUseCase,
		@inject('UpdateCategoryUseCase') private updateCategoryUseCase: UpdateCategoryUseCase,
		@inject('DeleteCategoryUseCase') private deleteCategoryUseCase: DeleteCategoryUseCase
	) {}
	async getCategory(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			const category = await this.getCategoryByIDUseCase.execute(id);
			res.status(200).json(toCategoryDTO(category));
		} catch (error) {
			next(error);
		}
	}

	async getAllCategories(req = request, res = response, next: NextFunction) {
		try {
			const { limit } = req.query;
			const { total, categories } = await this.getCategoriesUseCase.execute(Number(limit));

			return res
				.status(201)
				.json({ total, categories: categories.map((category) => toCategoryDTO(category)) });
		} catch (error) {
			next(error);
		}
	}

	async postCategory(req = request, res = response, next: NextFunction) {
		try {
			const uid = res.locals.uid;
			req.body.user = uid;
			const category = await this.createCategoryUseCase.execute(toDomainEntity(req.body));
			return res.status(201).json(toCategoryDTO(category));
		} catch (error) {
			next(error);
		}
	}

	async putCategory(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			const category = await this.updateCategoryUseCase.execute(id, toDomainEntity(req.body));
			res.status(200).json(toCategoryDTO(category));
		} catch (error) {
			next(error);
		}
	}

	async deleteCategory(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			const category = await this.deleteCategoryUseCase.execute(id);
			return res.status(200).json(toCategoryDTO(category));
		} catch (error) {
			next(error);
		}
	}
}
