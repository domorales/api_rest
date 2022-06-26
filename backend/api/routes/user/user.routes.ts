import { Router } from 'express';

import { containerGlobal } from '../../../config/container';
import validateRol from '../shared/validates/validateRol';
import ValidatorTokenLogin from '../shared/validates/ValidatorTokenLogin';
import UserController from '../../controllers/user/UserController';
import returnErrorFieldsRequest from '../shared/returnErrorFieldsRequest';
import {
	checkCreateUser,
	checkDeleteUser,
	checkGetUser,
	checkUpdateUser,
} from './userCheckFields';

const router = Router();
const controller = containerGlobal.resolve(UserController);
const validatorTokenLogin = containerGlobal.resolve(ValidatorTokenLogin);

router.get(
	'/:id',
	validatorTokenLogin.validate.bind(validatorTokenLogin),
	checkGetUser,
	returnErrorFieldsRequest,
	controller.getUser.bind(controller)
);

router.get(
	'/',
	validatorTokenLogin.validate.bind(validatorTokenLogin),
	controller.getUsers.bind(controller)
);

router.get(
	'/upload/:id',
	/*validatorTokenLogin.validate.bind(validatorTokenLogin),
	checkUpdateUser,
	returnErrorFieldsRequest,*/
	controller.getImage.bind(controller)
);

router.post(
	'/',
	//validatorTokenLogin.validate.bind(validatorTokenLogin),
	checkCreateUser,
	returnErrorFieldsRequest,
	controller.postUser.bind(controller)
);

router.put(
	'/upload/:id',
	/*validatorTokenLogin.validate.bind(validatorTokenLogin),
	checkUpdateUser,
	returnErrorFieldsRequest,*/
	controller.updateImageUser.bind(controller)
);

router.put(
	'/:id',
	validatorTokenLogin.validate.bind(validatorTokenLogin),
	checkUpdateUser,
	returnErrorFieldsRequest,
	controller.putUser.bind(controller)
);

router.delete(
	'/:id',
	validatorTokenLogin.validate.bind(validatorTokenLogin),
	checkDeleteUser,
	validateRol('ADMIN_ROL', 'VENTAS_ROL'),
	controller.deleteUser.bind(controller)
);

export default router;
