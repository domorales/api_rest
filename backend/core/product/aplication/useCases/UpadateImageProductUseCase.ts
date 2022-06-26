export default interface UpadateImageProductUseCase {
	execute(id: string, path: string): Promise<void>;
}
