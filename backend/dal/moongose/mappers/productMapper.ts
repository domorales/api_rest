import Product from '../../../core/product/domain/Product';
import { CategoryEntity } from '../entities/category';
import { ProductEntity } from '../entities/product';
import { UserEntity } from '../entities/user';
import {
	toDomainCategoryEntity,
	toDomainCategoryEntityOnlyID,
} from '../mappers/categoryMapper';
import { toDomainUserEntity, toDomainUserEntityOnlyID } from '../mappers/userMapper';

const toDomainProductEntity = (productDB: ProductEntity): Product => {
	return Product.createProductWithId(
		productDB._id,
		productDB.name,
		productDB.description,
		productDB.price,
		productDB.image,
		productDB.available,
		toDomainUserEntityOnlyID(<string>productDB.user),
		toDomainCategoryEntityOnlyID(<string>productDB.category)
	);
};

const toDomainProductEntityPopulate = (productDB: ProductEntity): Product => {
	return Product.createProductWithId(
		productDB._id,
		productDB.name,
		productDB.description,
		productDB.price,
		productDB.image,
		productDB.available,
		toDomainUserEntity(<UserEntity>productDB.user),
		toDomainCategoryEntity(<CategoryEntity>productDB.category)
	);
};

const toDBCreateEntity = (product: Product): ProductEntity => {
	const productDB: ProductEntity = {
		_id: product.id,
		name: product.name,
		description: product.description,
		price: product.price,
		available: product.available,
		state: product.state,
		category: product.category.id,
		user: product.user.id,
	};
	return productDB;
};

const toDBUpdateEntity = (product: Product): ProductEntity => {
	const productDB: ProductEntity = {
		name: product.name,
		description: product.description,
		price: product.price,
		available: product.available,
		state: product.state,
		category: product.category.id,
	};
	return productDB;
};

export {
	toDomainProductEntity,
	toDomainProductEntityPopulate,
	toDBCreateEntity,
	toDBUpdateEntity,
};
