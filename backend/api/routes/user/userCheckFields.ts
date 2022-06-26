import { check, param } from 'express-validator';

import { containerGlobal } from '../../../config/container';
import UserCustomValidationFields from './UserCustomValidationFields';

const validationCustom = containerGlobal.resolve(UserCustomValidationFields);

const checkCreateUser = [
	check('name', 'Campo name no puede ir vacio').not().isEmpty(),
	check('password', 'Campo password no es valido').not().isEmpty().isLength({ min: 8 }),
	check('email', 'Campo email no puede ir vacio').not().isEmpty(),
	check('email', 'Campo email no es valido').isEmail(),
	check('rol', 'Campo rol no es valido').not().isEmpty(),
	check('id', 'No puede enviar el id').isEmpty(),
	check('_id', 'No puede enviar el id').isEmpty(),
];

const checkGetUser = [
	param('id').custom(validationCustom.validateUserID.bind(validationCustom)),
];

const checkDeleteUser = [
	param('id').custom(validationCustom.validateUserID.bind(validationCustom)),
];

const checkUpdateUser = [
	check('id', 'No puede actualizar el id').isEmpty(),
	check('_id', 'No puede actualizar el id').isEmpty(),
	param('id').custom(validationCustom.validateUserID.bind(validationCustom)),
];

const checkUserLogin = [
	check('password', 'Campo password no es valido').not().isEmpty().isLength({ min: 8 }),
	check('email', 'Campo email no puede ir vacio').not().isEmpty(),
	check('email', 'Campo email no es valido').isEmail(),
];

const checkAuthLogin = [check('id_token', 'Campo email no puede ir vacio').not().isEmpty()];

export {
	checkCreateUser,
	checkUpdateUser,
	checkUserLogin,
	checkAuthLogin,
	checkDeleteUser,
	checkGetUser,
};
