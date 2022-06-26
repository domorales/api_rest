import Category from '../../domain/Category';

export default interface GetCategoryByIDUseCase {
	execute(id: string): Promise<Category>;
}
