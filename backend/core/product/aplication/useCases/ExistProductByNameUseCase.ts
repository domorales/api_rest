export default interface ExistProductByNameUseCase {
	execute(name: string): Promise<boolean>;
}
