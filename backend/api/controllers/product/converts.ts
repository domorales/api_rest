import Category from '../../../core/category/domain/Category';
import Product from '../../../core/product/domain/Product';
import User from '../../../core/user/domain/User';
import { toCategoryDTO } from '../category/converts';
import { toUserDTO } from '../user/converters';
import ProductDTO from './ProductDTO';

const toDomainProductEntity = (body: any): Product => {
	return Product.createProductWithOutId(
		body.name,
		body.description,
		body.price,
		body.available,
		body.image,
		User.CreateUserWithtId(body.user, '', '', '', '', undefined),
		Category.createCategoryWhitId(body.category, '', undefined)
	);
};

const toProductDTO = (product: Product): ProductDTO => {
	const productDTO: ProductDTO = {
		uid: product.id,
		name: product.name,
		price: product.price,
		description: product.description,
		image: product.image,
		available: product.available,
		user: toUserDTO(product.user),
		category: toCategoryDTO(product.category),
	};
	return productDTO;
};

export { toDomainProductEntity, toProductDTO };
