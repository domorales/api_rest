export default class GenericException extends Error {
	readonly message: string;
	readonly status: number;
	constructor(message: string, code: number) {
		super(message);
		this.message = message;
		this.status = code;
	}
}
