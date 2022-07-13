import { singleton } from 'tsyringe';

import { Optional } from '../../../core/shared/types/Optional';
import IUserRepository from '../../../core/user/domain/ports/IUserRepository';
import User from '../../../core/user/domain/User';
import { UserModel } from '../entities/user';
import { toDBEntity, toDomainUserEntity } from '../mappers/userMapper';

@singleton()
export default class UserRepository implements IUserRepository {
	private static readonly DEFAULT_NUMBER_GET_USERS = 5;
	async getByID(id: string): Promise<Optional<User>> {
		const result = await UserModel.findOne({ _id: id, state: true });
		return result ? toDomainUserEntity(result) : undefined;
	}

	async getAll(
		limit: number = UserRepository.DEFAULT_NUMBER_GET_USERS
	): Promise<{ total: number; users: User[] }> {
		const query = { state: true };
		const result = await Promise.all([
			UserModel.find(query).limit(limit),
			UserModel.count(query),
		]);
		if (!result) throw new Error('No se encontro usuarios');

		return {
			total: result[1],
			users: result[0].map((user) => toDomainUserEntity(user)),
		};
	}

	async create(user: User): Promise<Optional<User>> {
		const document = new UserModel(toDBEntity(user));
		const result = await document.save();
		return result ? toDomainUserEntity(result) : undefined;
	}

	async getByEmail(email: string): Promise<Optional<User>> {
		const result = await UserModel.findOne({ email: email });
		return result ? toDomainUserEntity(result) : undefined;
	}

	async existUserByEmail(email: string): Promise<boolean> {
		const result = await UserModel.findOne({ email: email });
		return result ? true : false;
	}
	async update(id: string, user: User): Promise<Optional<User>> {
		const result = await UserModel.findByIdAndUpdate(id, toDBEntity(user), { new: true });
		return result ? toDomainUserEntity(result) : undefined;
	}

	async delete(id: string): Promise<Optional<User>> {
		const result = await UserModel.findByIdAndUpdate(id, { state: false }, { new: true });
		return result ? toDomainUserEntity(result) : undefined;
	}

	async updateImage(id: string, path: string): Promise<void> {
		const result = await UserModel.findByIdAndUpdate(id, { image: path });
		if (!result) throw new Error('no subio img');
	}
}
