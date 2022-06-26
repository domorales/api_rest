import Category from '../../domain/Category';

export default interface UpdateCategoryUseCase {
	execute(id: string, category: Category): Promise<Category>;
}
