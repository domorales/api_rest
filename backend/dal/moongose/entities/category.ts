import { model, PopulatedDoc, Schema } from 'mongoose';

import { UserEntity } from './user';

interface CategoryEntity {
	_id?: string;
	name: string;
	state?: boolean;
	user?: PopulatedDoc<UserEntity & Document>;
}

const CategorySchema = new Schema<CategoryEntity>(
	{
		_id: { type: String },
		name: {
			type: String,
			required: [true, 'Se debe insertar nombre'],
			unique: true,
			uppercase: true,
		},
		state: { type: Boolean, default: true },
		user: {
			type: String,
			ref: 'User',
		},
	},
	{ _id: false }
);

const CategoryModel = model<CategoryEntity>('Category', CategorySchema);
export { CategoryModel, CategoryEntity };
