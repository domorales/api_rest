import User from '../../../user/domain/User';

export default interface ILoginByGoogleCase {
	execute(token: string): Promise<{ user: User; token: string }>;
}
