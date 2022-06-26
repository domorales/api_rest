import { model, PopulatedDoc, Schema } from 'mongoose';

import { CategoryEntity } from './category';
import { UserEntity } from './user';

interface ProductEntity {
	_id?: string;
	name: string;
	price: number;
	state: boolean;
	description: string;
	image?: string;
	available: boolean;
	user?: PopulatedDoc<UserEntity & Document>;
	category?: PopulatedDoc<CategoryEntity & Document>;
}

const ProductSchema = new Schema<ProductEntity>(
	{
		_id: { type: String },
		name: {
			type: String,
			required: [true, 'Se debe insertar nombre'],
			unique: true,
			uppercase: true,
		},
		state: { type: Boolean, default: true },
		price: { type: Number, default: 0 },
		description: { type: String },
		image: { type: String },
		available: { type: Boolean, default: true },
		user: {
			type: String,
			ref: 'User',
			required: true,
		},
		category: {
			type: String,
			ref: 'Category',
			required: true,
		},
	},
	{ _id: false }
);

const ProductModel = model<ProductEntity>('Product', ProductSchema);

export { ProductModel, ProductEntity };
