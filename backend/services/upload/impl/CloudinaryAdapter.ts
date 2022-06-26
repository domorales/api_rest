import { v2 as cloudinary } from 'cloudinary';

import { IUploadImage } from '../IUploadImage';

export class CloudinaryAdapter implements IUploadImage {
	private async update(path: string): Promise<string> {
		const { secure_url } = await cloudinary.uploader.upload(path);
		return secure_url;
	}
	async upload(oldPath: string, newPath: string): Promise<string> {
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			secure: true,
		});
		await this.delete(oldPath);
		return await this.update(newPath);
	}

	private async delete(path: string = ''): Promise<boolean> {
		const dataPath = path.split('/'),
			nameWhithExtension = dataPath[dataPath.length - 1],
			[id] = nameWhithExtension.split('.');
		const { invalidate } = await cloudinary.uploader.destroy(id);

		return invalidate;
	}
}
