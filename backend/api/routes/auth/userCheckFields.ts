import { check } from 'express-validator';

const checkLogin = [
	check('password', 'Campo password no es valido').not().isEmpty().isLength({ min: 8 }),
	check('email', 'Campo email no puede ir vacio').not().isEmpty(),
	check('email', 'Campo email no es valido').isEmail(),
];

const checkLoginExternal = [
	check('id_token', 'Campo email no puede ir vacio').not().isEmpty(),
];

export { checkLogin, checkLoginExternal };
