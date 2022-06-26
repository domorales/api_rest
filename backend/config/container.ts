import { container } from 'tsyringe';

import LoginUserUseCaseImpl from '../core/auth/aplication/impl/LoginUserUseCaseImpl';
import {
	CreateCategoryUseCaseImpl,
	DeleteCategoryUseCaseImpl,
	GetCategoriesUseCaseImpl,
	GetCategoryByIDUseCaseImpl,
	GetCategoryByNameUseCaseImpl,
	UpdateCategoryUseCaseImpl,
} from '../core/category/aplication/impl';
import {
	CreateProductUseCaseImpl,
	DeleteProductUseCaseImpl,
	ExistProductByNameUseCaseImpl,
	GetAllProductsUseCaseImpl,
	GetProductByIDUseCaseImpl,
	UpadateImageProductUseCaseImpl,
	UpdateProducttUseCaseImpl,
} from '../core/product/aplication/impl';
import {
	CreateUserUseCaseImpl,
	DeleteUserUseCaseImpl,
	GetUsersUseCaseImpl,
	GetUserUseCaseImpl,
	UpdateImageUserUseCaseImpl,
	UpdateUserUseCaseImpl,
} from '../core/user/aplication/impl';
import CategoryRepositoy from '../dal/moongose/repositories/CategoryRepository';
import ProductRepository from '../dal/moongose/repositories/ProductRepository';
import UserRepositoy from '../dal/moongose/repositories/UserRepository';
import BycriptAdapter from '../services/encrypt/impl/BycryptAdapter';
import JWTAdapter from '../services/loginValidator/impl/JWTAdapter';
import { CloudinaryAdapter } from '../services/upload/impl/CloudinaryAdapter';

const containerGlobal = container;

//USER
containerGlobal.register('LoginUserCase', { useClass: LoginUserUseCaseImpl });
containerGlobal.register('GetUserUseCase', { useClass: GetUserUseCaseImpl });
containerGlobal.register('GetUsersUseCase', { useClass: GetUsersUseCaseImpl });
containerGlobal.register('CreateUserUseCase', { useClass: CreateUserUseCaseImpl });
containerGlobal.register('UpdateGetUserUseCase', { useClass: UpdateUserUseCaseImpl });
containerGlobal.register('DeleteGetUserUseCase', { useClass: DeleteUserUseCaseImpl });
containerGlobal.register('UserRepository', { useClass: UserRepositoy });
containerGlobal.register('UpdateImageUseCase', { useClass: UpdateImageUserUseCaseImpl });

//CATEGORY
containerGlobal.register('GetCategoryByIDUseCase', { useClass: GetCategoryByIDUseCaseImpl });
containerGlobal.register('GetCategoryByNameUseCase', {
	useClass: GetCategoryByNameUseCaseImpl,
});
containerGlobal.register('GetCategoriesUseCase', { useClass: GetCategoriesUseCaseImpl });
containerGlobal.register('CreateCategoryUseCase', { useClass: CreateCategoryUseCaseImpl });
containerGlobal.register('UpdateCategoryUseCase', { useClass: UpdateCategoryUseCaseImpl });
containerGlobal.register('DeleteCategoryUseCase', { useClass: DeleteCategoryUseCaseImpl });
containerGlobal.register('CategoryRepository', { useClass: CategoryRepositoy });

//PRODUCT
containerGlobal.register('GetProductByIDUseCase', { useClass: GetProductByIDUseCaseImpl });
containerGlobal.register('ExistProductByNameUseCase', {
	useClass: ExistProductByNameUseCaseImpl,
});
containerGlobal.register('GetAllProductsUseCase', { useClass: GetAllProductsUseCaseImpl });
containerGlobal.register('CreateProductUseCase', { useClass: CreateProductUseCaseImpl });
containerGlobal.register('UpdateProductUseCase', { useClass: UpdateProducttUseCaseImpl });
containerGlobal.register('UpadateImageProductUseCase', {
	useClass: UpadateImageProductUseCaseImpl,
});
containerGlobal.register('DeleteProductUseCase', { useClass: DeleteProductUseCaseImpl });
containerGlobal.register('ProductRepository', { useClass: ProductRepository });

//SERVICIES
containerGlobal.register('IEncrypt', { useClass: BycriptAdapter });
containerGlobal.register('ILoginValidator', { useClass: JWTAdapter });
containerGlobal.register('IUploadImage', { useClass: CloudinaryAdapter });

export { containerGlobal };
