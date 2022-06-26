import UploadException from './UploadException';

export default class NotSendFileException extends UploadException {
	constructor(error: string) {
		super(error);
	}
}
