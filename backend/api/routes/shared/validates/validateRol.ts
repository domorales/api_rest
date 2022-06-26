import { NextFunction, request, response } from 'express';
const validateRol = (...roles: string[]) => {
	return (req = request, res = response, next: NextFunction) => {
		const user = res.locals.user;
		const { rol } = user;
		if (!roles.includes(rol))
			return res.status(401).json({ message: 'Rol de usuario no permitido' });
		next();
	};
};
export default validateRol;
