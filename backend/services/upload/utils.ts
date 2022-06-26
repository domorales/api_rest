import { FileArray, UploadedFile } from 'express-fileupload';

import NotSendFileException from './exception/NotSendFIleExecption';

const pathTmp = (files: FileArray): string => {
	const isFile = files != null && Object.keys(files).length === 1,
		archivo = <UploadedFile>files.archivo;
	if (!isFile || !archivo) throw new NotSendFileException('No existe archivo que subir');
	return archivo.tempFilePath;
};

export { pathTmp };
