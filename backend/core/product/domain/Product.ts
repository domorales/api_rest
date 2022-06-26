import Category from '../../category/domain/Category';
import Entity from '../../shared/types/Entity';
import User from '../../user/domain/User';

export default class Product extends Entity {
	private _name: string;
	private _state: boolean;
	private _description: string;
	private _price: number;
	private _image: string;
	private _available: boolean;
	private _user: User;
	private _category: Category;

	private constructor(
		id: string,
		name: string,
		description: string,
		price: number,
		available: boolean,
		image: string,
		user: User,
		category: Category
	) {
		if (price < 0) throw new Error('El precio no puede ser menor a cero');
		super(id);
		this._name = name;
		this._state = true;
		this._description = description;
		this._price = price;
		this._image = image;
		this._available = available;
		this._user = user;
		this._category = category;
	}

	public static createProductWithId(
		id: string,
		name: string,
		description: string,
		price: number,
		image: string,
		available: boolean,
		user: User,
		category: Category
	) {
		return new Product(id, name, description, price, available, image, user, category);
	}

	public static createProductWithOutId(
		name: string,
		description: string,
		price: number,
		available: boolean,
		image: string,
		user: User,
		category: Category
	) {
		return new Product(undefined, name, description, price, available, image, user, category);
	}

	public get state(): boolean {
		return this._state;
	}

	public get name(): string {
		return this._name;
	}

	public get description(): string {
		return this._description;
	}

	public get price(): number {
		return this._price;
	}

	public get available(): boolean {
		return this._available;
	}

	public get image(): string {
		return this._image;
	}

	public get user(): User {
		return this._user;
	}

	public get category(): Category {
		return this._category;
	}

	public disabled() {
		this._available = false;
	}
}
