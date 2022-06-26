export default interface ILoginStrategy {
	exec(token: string): Promise<{ name: string; email: string; image: string }>;
}
