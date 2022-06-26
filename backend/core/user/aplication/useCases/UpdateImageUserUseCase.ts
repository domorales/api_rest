export default interface UpdateImageUserUseCase {
	execute(id: string, pathImage: string): Promise<void>;
}
