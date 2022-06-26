import User from '../../domain/User';

export default interface GetUsersUseCase {
	execute(limit: number): Promise<{ total: number; users: User[] }>;
}
