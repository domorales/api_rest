import { Optional } from '../../../shared/types/Optional';
import Product from '../Product';

export default interface IProductRepository {
	getByID(id: string): Promise<Optional<Product>>;
	getByIDPopulate(id: string): Promise<Optional<Product>>;
	getAll(limit: number): Promise<Product[]>;
	existByName(name: string): Promise<boolean>;
	create(product: Product): Promise<Optional<Product>>;
	update(id: string, product: Product): Promise<Optional<Product>>;
	delete(id: string): Promise<boolean>;
	updateImage(id: string, path: string): Promise<void>;
}
