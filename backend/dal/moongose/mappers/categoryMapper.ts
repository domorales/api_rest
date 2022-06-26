import Category from '../../../core/category/domain/Category';
import { CategoryEntity } from '../entities/category';
import { UserEntity } from '../entities/user';
import { toDomainUserEntity, toDomainUserEntityOnlyID } from '../mappers/userMapper';

const toDomainCategoryEntityPopulate = (categoryDB: CategoryEntity): Category => {
	return Category.createCategoryWhitId(
		categoryDB._id,
		categoryDB.name,
		toDomainUserEntity(<UserEntity>categoryDB.user)
	);
};

const toDomainCategoryEntity = (categoryDB: CategoryEntity): Category => {
	return Category.createCategoryWhitId(
		categoryDB._id,
		categoryDB.name,
		toDomainUserEntityOnlyID(<string>categoryDB.user)
	);
};

const toDomainCategoryEntityOnlyID = (id: string): Category => {
	return Category.createCategoryWhitId(id, undefined, undefined);
};

const toDBCreateEntity = (category: Category): CategoryEntity => {
	const categoryDB: CategoryEntity = {
		_id: category.id,
		name: category.name,
		user: category.user.id,
	};
	return categoryDB;
};

const toDBUpdateEntity = (category: Category): CategoryEntity => {
	const categoryDB: CategoryEntity = {
		name: category.name,
	};
	return categoryDB;
};

export {
	toDomainCategoryEntity,
	toDomainCategoryEntityOnlyID,
	toDomainCategoryEntityPopulate,
	toDBCreateEntity,
	toDBUpdateEntity,
};
