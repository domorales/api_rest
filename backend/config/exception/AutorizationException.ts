import GenericException from './GenericExecption';

export class AutorizationException extends GenericException {
	constructor(message: string) {
		super(message, 401);
	}
}
