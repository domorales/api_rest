import { body, param } from 'express-validator';

import { containerGlobal } from '../../../config/container';
import CategoryCustomValidationFields from './CategoryCustomValidationFIelds';

const customValidation = containerGlobal.resolve(CategoryCustomValidationFields);

const checkCreateCategory = [
	body('name', 'Campo name es obligatorio').notEmpty(),
	body('name').custom(customValidation.notExistNameCategory.bind(customValidation)),
];

const checkGetCategory = [
	param('id').custom(customValidation.validateExistIDCategory.bind(customValidation)),
];

const checkDeleteCategory = [
	param('id').custom(customValidation.validateExistIDCategory.bind(customValidation)),
];

const checkUpdateCategory = [
	param('id').custom(customValidation.validateExistIDCategory.bind(customValidation)),
	body('name', 'Campo name es obligatorio').notEmpty(),
];

export { checkCreateCategory, checkDeleteCategory, checkGetCategory, checkUpdateCategory };
