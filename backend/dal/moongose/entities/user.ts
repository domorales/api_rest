import { model, Schema } from 'mongoose';

interface UserEntity {
	_id?: string;
	name?: string;
	password?: string;
	email?: string;
	image?: string;
	rol?: string;
	state?: boolean;
	google?: boolean;
}

const UserSchema = new Schema<UserEntity>(
	{
		_id: { type: String },
		name: { type: String, require: [true, 'Campo name es requerido'], uppercase: true },
		password: { type: String, require: [true, 'Campo password es requerido'] },
		email: { type: String, require: [true, 'Campo email es requerido'], unique: true },
		image: { type: String },
		rol: { type: String, require: true },
		state: { type: Boolean, default: true },
		google: { type: Boolean, default: false },
	},
	{ _id: false }
);

const UserModel = model<UserEntity>('User', UserSchema);
export { UserModel, UserEntity };
