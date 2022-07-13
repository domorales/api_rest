import { Optional } from '../../../shared/types/Optional';
import Category from '../Category';

export default interface ICategoryRepository {
	create(category: Category): Promise<Optional<Category>>;
	getAll(limit: number): Promise<{ total: number; categories: Category[] }>;
	getByName(name: string): Promise<Optional<Category>>;
	getByID(id: string): Promise<Optional<Category>>;
	getByIDPopulateUser(id: string): Promise<Optional<Category>>;
	delete(id: string): Promise<Optional<Category>>;
	update(id: string, category: Category): Promise<Optional<Category>>;
}
