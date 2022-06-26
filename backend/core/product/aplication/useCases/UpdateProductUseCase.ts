import Product from '../../domain/Product';

export default interface UpdateProductUseCase {
	execute(id: string, product: Product): Promise<Product>;
}
