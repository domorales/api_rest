import { FileArray, UploadedFile } from 'express-fileupload';

import NotSendFileException from './exception/NotSendFIleExecption';

const MAX_NUMBER_FILE = 1;

const pathTmp = (files: FileArray): string => {
	const isFile = files && Object.keys(files).length === MAX_NUMBER_FILE,
		archivo = <UploadedFile>files.archivo;
	if (!isFile || !archivo) throw new NotSendFileException('No existe archivo que subir');
	return archivo.tempFilePath;
};

export { pathTmp };
