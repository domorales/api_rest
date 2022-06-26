import { inject, singleton } from 'tsyringe';

import { IUploadImage } from '../../../../services/upload/IUploadImage';
import IUserResposotory from '../../domain/ports/IUserRepository';
import { UpdateImageUserUseCase } from '../useCases';

@singleton()
export default class UpdateImageUserUseCaseImpl implements UpdateImageUserUseCase {
	constructor(
		@inject('UserRepository') private repository: IUserResposotory,
		@inject('IUploadImage') private uploadImg: IUploadImage
	) {}
	async execute(id: string, pathImage: string): Promise<void> {
		const { image } = await this.repository.getByID(id);

		const newPath = await this.uploadImg.upload(image, pathImage);
		await this.repository.updateImage(id, newPath);
	}
}
