import User from '../../domain/User';

export default interface CreateUserUseCase {
	execute(user: User): Promise<User>;
}
