import IProductRepository from '../../../core/product/domain/port/IProductRepository';
import Product from '../../../core/product/domain/Product';
import { Optional } from '../../../core/shared/types/Optional';
import { ProductModel } from '../entities/product';
import {
	toDBCreateEntity,
	toDBUpdateEntity,
	toDomainProductEntity,
	toDomainProductEntityPopulate,
} from '../mappers/productMapper';

export default class ProductRepository implements IProductRepository {
	private static readonly DEFAULT_NUMBER_GET_PRODUCTS = 5;

	async getByID(id: string): Promise<Optional<Product>> {
		const product = await ProductModel.findOne({ _id: id, state: true });
		return product ? toDomainProductEntity(product) : undefined;
	}
	async getByIDPopulate(id: string): Promise<Product> {
		const product = await ProductModel.findOne({ _id: id, state: true }).populate([
			'user',
			'category',
		]);
		return product ? toDomainProductEntityPopulate(product) : undefined;
	}
	async getAll(
		limit: number = ProductRepository.DEFAULT_NUMBER_GET_PRODUCTS
	): Promise<Product[]> {
		const productsDB = await ProductModel.find({ state: true })
			.limit(limit)
			.populate(['user', 'category']);
		const products = productsDB.map((product) => toDomainProductEntityPopulate(product));
		return products;
	}
	async existByName(name: string): Promise<boolean> {
		const result = await ProductModel.findOne({ name });
		return result ? true : false;
	}
	async create(product: Product): Promise<Optional<Product>> {
		const document = new ProductModel(toDBCreateEntity(product));
		const result = await document.save();
		return result ? toDomainProductEntity(result) : undefined;
	}
	async update(id: string, product: Product): Promise<Optional<Product>> {
		const result = await ProductModel.findByIdAndUpdate(id, toDBUpdateEntity(product), {
			new: true,
		});
		return result ? toDomainProductEntity(result) : undefined;
	}
	async delete(id: string): Promise<boolean> {
		const result = await ProductModel.findByIdAndUpdate(id, { state: false }, { new: true });
		return result ? true : false;
	}

	async updateImage(id: string, path: string): Promise<void> {
		const result = await ProductModel.findByIdAndUpdate(id, { image: path });
		if (!result) throw new Error('no subio img');
	}
}
