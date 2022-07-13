import { FileArray, UploadedFile } from 'express-fileupload';

import { MAX_NUMBER_FILE } from './constants';
import NotSendFileException from './exception/NotSendFIleExecption';

const pathTmp = (files: FileArray): string => {
	const isFile = files && Object.keys(files).length === MAX_NUMBER_FILE,
		archivo = <UploadedFile>files.archivo;
	if (!isFile || !archivo) throw new NotSendFileException('No existe archivo que subir');
	return archivo.tempFilePath;
};

export { pathTmp };
