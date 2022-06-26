import Category from '../../../core/category/domain/Category';
import User from '../../../core/user/domain/User';
import { toUserDTO } from '../user/converters';
import CategoryDTO from './CategoryDTO';

const toDomainEntity = (body: any): Category => {
	return Category.createCategoryWhitoutId(
		body.name,
		User.CreateUserWithtId(body.user, '', '', '', '', undefined)
	);
};

const toCategoryDTO = (category: Category): CategoryDTO => {
	const user = category.user ? toUserDTO(category.user) : undefined;
	const categoryDTO: CategoryDTO = {
		uid: category.id,
		name: category.name,
		user,
	};
	return categoryDTO;
};

export { toDomainEntity, toCategoryDTO };
