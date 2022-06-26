import Category from '../../domain/Category';

export default interface CreateCategoryUseCase {
	execute(category: Category): Promise<Category>;
}
