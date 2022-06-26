import User from '../../../core/user/domain/User';
import UserDTO from './UserDTO';

const toDomainEntity = (body: any): User => {
	return User.CreateUserWithoutId(body.name, body.email, body.password, body.image, body.rol);
};

const toUserDTO = (user: User): UserDTO => {
	const userEntity: UserDTO = {
		uid: user.id,
		name: user.name,
		email: user.email,
		image: user.image,
		rol: user.rol,
	};
	return userEntity;
};

export { toDomainEntity, toUserDTO };
