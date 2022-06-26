import Category from '../../domain/Category';

export default interface DeleteCategoryUseCase {
	execute(id: string): Promise<Category>;
}
