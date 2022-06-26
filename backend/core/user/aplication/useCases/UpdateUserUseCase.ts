import User from '../../domain/User';

export default interface UpdateUserUseCase {
	execute(id: string, user: User): Promise<User>;
}
