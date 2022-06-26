import bycript from 'bcryptjs';

import IEncrypt from '../IEncrypt';

export default class BycriptAdapter implements IEncrypt {
	async encrypt(password: string): Promise<string> {
		const salt = await bycript.genSalt();
		return bycript.hash(password, salt);
	}

	async validatePasswordOrFailSync(
		passReceived: string,
		originalPass: string
	): Promise<boolean> {
		const isCorrect = await bycript.compare(passReceived, originalPass);
		return isCorrect;
	}
}
