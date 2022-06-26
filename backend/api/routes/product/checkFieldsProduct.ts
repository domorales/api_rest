import { body, param, query } from 'express-validator';

import { containerGlobal } from '../../../config/container';
import CategoryCustomValidationFields from '../category/CategoryCustomValidationFIelds';
import ProductCustomValidationFields from './ProductCustomValidationFields';

const validateCustom = containerGlobal.resolve(ProductCustomValidationFields);
const validateCustomCategory = containerGlobal.resolve(CategoryCustomValidationFields);
const checkCreateProduct = [
	body('id', 'Campo id no es aceptable').isEmpty(),
	body('_id', 'Campo id no es aceptable').isEmpty(),
	body('state', 'Campo state no es aceptable').isEmpty(),
	body(
		'user',
		'Campo user no es aceptable, el user que se asociara es el correspondiente al que crea el producto'
	).isEmpty(),
	body('category', 'Campo category es obligatorio').notEmpty(),
	body('category').custom(
		validateCustomCategory.validateExistIDCategory.bind(validateCustomCategory)
	),
	body('name', 'Campo name es obligatorio').notEmpty(),
	body('name').custom(validateCustom.validateExistNameProduct.bind(validateCustom)),
];

const checkGetProduct = [
	param('id').custom(validateCustom.validateExistIDProduct.bind(validateCustom)),
];

const checkGetProducts = [query('limit', 'limit debe ser un valor numerico').isNumeric()];

const checkDeleteProduct = [
	param('id', 'ID enviado no es valido').custom(
		validateCustom.validateExistIDProduct.bind(validateCustom)
	),
];

const checkUpdateProduct = [
	param('id', 'ID enviado no es valido').custom(
		validateCustom.validateExistIDProduct.bind(validateCustom)
	),
	body('id', 'Campo id no es aceptable').isEmpty(),
	body('_id', 'Campo id no es aceptable').isEmpty(),
	body('user', 'Campo user no es aceptable').isEmpty(),
	body('category').custom(
		validateCustomCategory.validateExistIDCategory.bind(validateCustomCategory)
	),
	body('name', 'Campo name es obligatorio').notEmpty(),
	body('name').custom(validateCustom.validateExistNameProduct.bind(validateCustom)),
	body('state', 'Campo state no es aceptable').isEmpty(),
];

export {
	checkCreateProduct,
	checkDeleteProduct,
	checkGetProduct,
	checkGetProducts,
	checkUpdateProduct,
};
