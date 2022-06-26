import UploadException from './UploadException';

export default class FIleExtensionException extends UploadException {
	constructor(error: string) {
		super(error);
	}
}
