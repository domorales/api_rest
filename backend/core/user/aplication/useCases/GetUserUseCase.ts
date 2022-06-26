import User from '../../domain/User';

export default interface GetUserUseCase {
	execute(id: string): Promise<User>;
}
