import { FileArray, UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

import FIleExtensionException from './exception/FileExtensionException';
import NotSendFileException from './exception/NotSendFIleExecption';
import UploadException from './exception/UploadException';
import URL from './type/URL';

const uploadFile = async (
	file: UploadedFile,
	extensions: String[] = ['jpeg', 'jpg', 'png'],
	folder: string
): Promise<URL> => {
	try {
		const nameCut = file.name.split('.'),
			extensionFile = nameCut[nameCut.length - 1];

		if (!extensions.includes(extensionFile))
			throw new FIleExtensionException('Extension no valida');

		const nameFinal = `${v4()}.${extensionFile}`,
			pathTmp = path.join(__dirname, '/uploads/', folder, nameFinal);

		await file.mv(pathTmp);

		return new URL(nameFinal);
	} catch (error) {
		if (error instanceof Error) throw new UploadException(error.message);
	}
};
const validateUploadFile = async (files: FileArray): Promise<void> => {
	const notExistsFiles = !files || Object.keys(files).length === 0,
		file = <UploadedFile>files.archivo;
	if (notExistsFiles || !file) throw new NotSendFileException('No existe archivo que subir');
};
const deleteUploadFile = (image: string = '', collection: string = '') => {
	const path = concatPath(image, collection);
	if (existsPathImg(path)) {
		fs.unlinkSync(path);
	}
};
const existsPathImg = (path: string) => {
	return fs.existsSync(path);
};

const concatPath = (image: string = '', collection: string = '') => {
	return path.join(__dirname, '/uploads/', collection, image);
};

export { uploadFile, validateUploadFile, deleteUploadFile, concatPath, existsPathImg };
