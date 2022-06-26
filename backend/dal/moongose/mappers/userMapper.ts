import User from '../../../core/user/domain/User';
import { UserEntity } from '../entities/user';

const toDomainUserEntityOnlyID = (id: string): User => {
	return User.CreateUserWithtId(id, undefined, undefined, undefined, undefined, undefined);
};

const toDomainUserEntity = (userDB: UserEntity): User => {
	return User.CreateUserWithtId(
		userDB._id,
		userDB.name,
		userDB.email,
		userDB.password,
		userDB.image,
		userDB.rol
	);
};

const toDBEntity = (user: User): UserEntity => {
	const userEntity: UserEntity = {
		_id: user.id,
		name: user.name,
		email: user.email,
		password: user.password,
		image: user.image,
		rol: user.rol,
	};
	return userEntity;
};

export { toDomainUserEntity, toDBEntity, toDomainUserEntityOnlyID };
