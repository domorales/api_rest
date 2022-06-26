import Product from '../../domain/Product';

export default interface CreateProductUseCase {
	execute(product: Product): Promise<Product>;
}
