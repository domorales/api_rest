import Entity from '../../shared/types/Entity';
import User from '../../user/domain/User';

export default class Category extends Entity {
	private _name: string;
	private _state: boolean;
	private _user: User;

	private constructor(id: string, name: string, user: User) {
		super(id);
		this._name = name;
		this._user = user;
		this._state = true;
	}

	public static createCategoryWhitoutId(name: string, user: User): Category {
		return new Category(undefined, name, user);
	}
	public static createCategoryWhitId(id: string, name: string, user: User) {
		return new Category(id, name, user);
	}

	public get name() {
		return this._name;
	}

	public get state() {
		return this._state;
	}

	public get user() {
		return this._user;
	}
}
