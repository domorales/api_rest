import Category from '../../domain/Category';

export default interface GetCategoryByNameUseCase {
	execute(name: string): Promise<Category>;
}
