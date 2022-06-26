import ILoginStrategy from './ILoginStrategy';

export default class LoginContext {
	constructor(private strategy: ILoginStrategy) {}

	async executeStrategy(
		token: string
	): Promise<{ name: string; email: string; image: string }> {
		return await this.strategy.exec(token);
	}
}
