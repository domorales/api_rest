import Category from '../../../core/category/domain/Category';
import ICategoryRepository from '../../../core/category/domain/port/ICategoryRepository';
import { Optional } from '../../../core/shared/types/Optional';
import { CategoryModel } from '../entities/category';
import {
	toDBCreateEntity,
	toDBUpdateEntity,
	toDomainCategoryEntity,
	toDomainCategoryEntityPopulate,
} from '../mappers/categoryMapper';

export default class CategoryRepository implements ICategoryRepository {
	private static readonly DEFAULT_NUMBER_GET_CATEGORIES = 5;
	async create(category: Category): Promise<Optional<Category>> {
		const document = new CategoryModel(toDBCreateEntity(category));
		const categoryDB = await document.save();
		return categoryDB ? toDomainCategoryEntity(categoryDB) : undefined;
	}

	async getAll(
		limit: number = CategoryRepository.DEFAULT_NUMBER_GET_CATEGORIES
	): Promise<{ total: number; categories: Category[] }> {
		const query = { state: true };
		const result = await Promise.all([
			CategoryModel.find(query).limit(limit).populate('user'),
			CategoryModel.count(query),
		]);
		const categories = result[0].map((category) => toDomainCategoryEntityPopulate(category));
		return { total: result[1], categories };
	}

	async getByName(name: string): Promise<Optional<Category>> {
		const categoryDB = await CategoryModel.findOne({ name });
		return categoryDB ? toDomainCategoryEntity(categoryDB) : undefined;
	}

	async getByID(id: string): Promise<Optional<Category>> {
		const categoryDB = await CategoryModel.findOne({ _id: id });
		return categoryDB ? toDomainCategoryEntity(categoryDB) : undefined;
	}

	async getByIDPopulateUser(id: string): Promise<Optional<Category>> {
		const categoryDB = await CategoryModel.findOne({ _id: id, state: true }).populate('user');
		return categoryDB ? toDomainCategoryEntity(categoryDB) : undefined;
	}

	async delete(id: string): Promise<Optional<Category>> {
		const categoryDB = await CategoryModel.findByIdAndUpdate(
			id,
			{ state: false },
			{ new: true }
		);
		return categoryDB ? toDomainCategoryEntity(categoryDB) : undefined;
	}

	async update(id: string, category: Category): Promise<Optional<Category>> {
		const categoryUpdate = await CategoryModel.findByIdAndUpdate(
			id,
			toDBUpdateEntity(category),
			{
				new: true,
			}
		);
		return categoryUpdate ? toDomainCategoryEntity(categoryUpdate) : undefined;
	}
}
