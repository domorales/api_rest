import Product from '../../domain/Product';

export default interface GetProductByIDUseCase {
	execute(id: string): Promise<Product>;
}
