import Category from '../../domain/Category';

export default interface GetCategoriesUseCase {
	execute(limit: number): Promise<{ total: number; categories: Category[] }>;
}
