export default interface DeleteUserUseCase {
	execute(id: string): Promise<void>;
}
