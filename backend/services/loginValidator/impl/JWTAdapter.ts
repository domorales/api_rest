import jwt, { JwtPayload } from 'jsonwebtoken';

import ILoginValidator from '../ILoginValidator';

export default class JWTAdapter implements ILoginValidator {
	async generateToken(uid: string): Promise<string> {
		const payload = { uid },
			token = await jwt.sign(payload, process.env.SECRETJWTKEY, { expiresIn: '1d' });
		return token;
	}

	async verifyToken(token: string): Promise<string> {
		const payload: JwtPayload = (await jwt.verify(
			token,
			process.env.SECRETJWTKEY
		)) as JwtPayload;
		return payload.sub as string;
	}
}
