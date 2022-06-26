import GenericException from './GenericExecption';

export class Execption404 extends GenericException {
	constructor(message: string) {
		super(message, 404);
	}
}
