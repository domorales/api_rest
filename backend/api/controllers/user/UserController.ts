import { NextFunction, request, response } from 'express';
import { inject, singleton } from 'tsyringe';

import {
	CreateUserUseCase,
	DeleteUserUseCase,
	GetUsersUseCase,
	GetUserUseCase,
	UpdateImageUserUseCase,
	UpdateUserUseCase,
} from '../../../core/user/aplication/useCases';
import { pathTmp } from '../../../services/upload/utils';
import { toDomainEntity, toUserDTO } from './converters';

@singleton()
export default class UserController {
	constructor(
		@inject('GetUserUseCase') private getUserUseCase: GetUserUseCase,
		@inject('GetUsersUseCase') private getUsersUseCase: GetUsersUseCase,
		@inject('CreateUserUseCase') private createUserUseCase: CreateUserUseCase,
		@inject('UpdateGetUserUseCase') private updateUserUseCase: UpdateUserUseCase,
		@inject('DeleteGetUserUseCase') private deleteUserUseCase: DeleteUserUseCase,
		@inject('UpdateImageUseCase') private updateImageUseCase: UpdateImageUserUseCase
	) {}

	public async getUser(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			const user = await this.getUserUseCase.execute(id);
			res.status(200).json(toUserDTO(user));
		} catch (error) {
			next(error);
		}
	}

	public async getUsers(req = request, res = response, next: NextFunction) {
		try {
			const { limit } = req.query;
			const { total, users } = await this.getUsersUseCase.execute(Number(limit));
			const usersDTO = users.map((user) => toUserDTO(user));
			res.status(200).json({ total, usersDTO });
		} catch (error) {
			next(error);
		}
	}

	public async postUser(req = request, res = response, next: NextFunction) {
		try {
			const user = await this.createUserUseCase.execute(toDomainEntity(req.body));
			res.status(201).json(toUserDTO(user));
		} catch (error) {
			next(error);
		}
	}

	public async putUser(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			const user = await this.updateUserUseCase.execute(id, toDomainEntity(req.body));
			return res.status(200).json(toUserDTO(user));
		} catch (error) {
			next(error);
		}
	}

	public async deleteUser(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			await this.deleteUserUseCase.execute(id);
			return res.status(200).json({ message: 'Eliminado con exito' });
		} catch (error) {
			next(error);
		}
	}

	public async updateImageUser(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params;
			const files = req.files;
			const patTmp = pathTmp(files);
			await this.updateImageUseCase.execute(id, patTmp);
			return res.status(200).json({ message: 'EXITO AL SUBIR IMAGEN' });
		} catch (error) {
			next(error);
		}
	}

	public async getImage(req = request, res = response, next: NextFunction) {
		try {
			const { id } = req.params,
				user = await this.getUserUseCase.execute(id),
				userDTO = toUserDTO(user);

			const image = userDTO.image;
			if (image) return res.json({ image });
			return res.status(404).json({ messagee: 'No existe imagen' });
		} catch (error) {
			next(error);
		}
	}
}
