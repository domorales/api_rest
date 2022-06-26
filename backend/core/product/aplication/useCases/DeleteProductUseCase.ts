export default interface DeleteProductUseCase {
	execute(id: string): Promise<boolean>;
}
