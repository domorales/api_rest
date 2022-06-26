import { Router } from 'express';

import { containerGlobal } from '../../../config/container';
import ValidatorTokenLogin from '../shared/validates/ValidatorTokenLogin';
import ProductController from '../../controllers/product/ProductController';
import returnErrorFieldsRequest from '../shared/returnErrorFieldsRequest';
import {
	checkCreateProduct,
	checkDeleteProduct,
	checkGetProduct,
	checkGetProducts,
	checkUpdateProduct,
} from './checkFieldsProduct';

const router = Router();
const controller = containerGlobal.resolve(ProductController);
const jwt = containerGlobal.resolve(ValidatorTokenLogin);

router.get(
	'/:id',
	jwt.validate.bind(jwt),
	checkGetProduct,
	returnErrorFieldsRequest,
	controller.getProduct.bind(controller)
);
router.get(
	'/',
	jwt.validate.bind(jwt),
	checkGetProducts,
	returnErrorFieldsRequest,
	controller.getAllProducts.bind(controller)
);
router.post(
	'/',
	jwt.validate.bind(jwt),
	checkCreateProduct,
	returnErrorFieldsRequest,
	controller.postProduct.bind(controller)
);
router.put(
	'/:id',
	jwt.validate.bind(jwt),
	checkUpdateProduct,
	returnErrorFieldsRequest,
	controller.putProduct.bind(controller)
);
router.put(
	'/upload/:id',
	//jwt.validate.bind(jwt),
	checkGetProduct,
	returnErrorFieldsRequest,
	controller.putImageProduct.bind(controller)
);
router.delete(
	'/:id',
	jwt.validate.bind(jwt),
	checkDeleteProduct,
	returnErrorFieldsRequest,
	controller.deleteProduct.bind(controller)
);

export default router;
