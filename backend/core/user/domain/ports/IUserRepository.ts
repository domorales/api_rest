import { Optional } from '../../../shared/types/Optional';
import User from '../User';

export default interface IUserRepository {
	getByID(id: string): Promise<Optional<User>>;
	getByEmail(email: string): Promise<Optional<User>>;
	getAll(limit: number): Promise<{ total: number; users: User[] }>;
	create(user: User): Promise<Optional<User>>;
	update(id: string, user: User): Promise<Optional<User>>;
	delete(id: string): Promise<Optional<User>>;
	existUserByEmail(email: string): Promise<boolean>;
	updateImage(id: string, path: string): Promise<void>;
}
