import { v4 } from 'uuid';

export default abstract class Entity {
	protected _id: string;

	constructor(id: string) {
		this._id = id || v4();
	}

	public get id(): string {
		return this._id;
	}
}
