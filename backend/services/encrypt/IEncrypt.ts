export default interface IEncrypt {
	encrypt(password: string): Promise<string>;
	validatePasswordOrFailSync(passReceived: string, originalPass: string): Promise<boolean>;
}
