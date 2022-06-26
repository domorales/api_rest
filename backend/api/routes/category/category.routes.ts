import { Router } from 'express';

import { containerGlobal } from '../../../config/container';
import ValidatorTokenLogin from '../shared/validates/ValidatorTokenLogin';
import CategoryController from '../../controllers/category/CategoryController';
import returnErrorFieldsRequest from '../shared/returnErrorFieldsRequest';
import {
	checkCreateCategory,
	checkDeleteCategory,
	checkGetCategory,
	checkUpdateCategory,
} from './checkFieldsCategory';

const router = Router();
const controller = containerGlobal.resolve(CategoryController);
const jwt = containerGlobal.resolve(ValidatorTokenLogin);

router.get('/', jwt.validate.bind(jwt), controller.getAllCategories.bind(controller));
router.get(
	'/:id',
	jwt.validate.bind(jwt),
	checkGetCategory,
	returnErrorFieldsRequest,
	controller.getCategory.bind(controller)
);
router.post(
	'/',
	jwt.validate.bind(jwt),
	checkCreateCategory,
	returnErrorFieldsRequest,
	controller.postCategory.bind(controller)
);
router.put(
	'/:id',
	jwt.validate.bind(jwt),
	checkUpdateCategory,
	returnErrorFieldsRequest,
	controller.putCategory.bind(controller)
);
router.delete(
	'/:id',
	jwt.validate.bind(jwt),
	checkDeleteCategory,
	returnErrorFieldsRequest,
	controller.deleteCategory.bind(controller)
);

export default router;
