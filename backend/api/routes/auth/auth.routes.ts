import { Router } from 'express';

import { containerGlobal } from '../../../config/container';
import UserLoginController from '../../controllers/auth/UserLoginController';
import returnErrorFieldsRequest from '../shared/returnErrorFieldsRequest';
import { checkLogin } from './userCheckFields';

const router = Router();

const controller = containerGlobal.resolve(UserLoginController);

router.post(
	'/',
	checkLogin,
	returnErrorFieldsRequest,
	controller.loginDefault.bind(controller)
);

export default router;
