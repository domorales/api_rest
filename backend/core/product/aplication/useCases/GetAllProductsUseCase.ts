import Product from '../../domain/Product';

export default interface GetAllProductsUseCase {
	execute(limit: number): Promise<Product[]>;
}
