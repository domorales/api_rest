export default interface ILoginValidator {
	generateToken(uid: string): Promise<string>;
	verifyToken(token: string): Promise<string>;
}
