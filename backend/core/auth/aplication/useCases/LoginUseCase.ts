export default interface LoginUserCase {
	execute(email: string, password: string): Promise<string>;
}
