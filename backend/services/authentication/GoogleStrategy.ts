import ILoginStrategy from './ILoginStrategy';
import { OAuth2Client } from 'google-auth-library';

export default class GoogleStrategy implements ILoginStrategy {
	async exec(token: string): Promise<{ name: string; email: string; image: string }> {
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const { email, name, picture } = ticket.getPayload();
		return { name, email, image: picture };
	}
}
