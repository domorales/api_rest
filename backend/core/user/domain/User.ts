import Entity from '../../shared/types/Entity';

export default class User extends Entity {
	private _name: string;
	private _password: string;
	private _email: string;
	private _image: string;
	private _rol: string;
	private _state: boolean;
	private _google: boolean;

	private constructor(
		id: string,
		name: string,
		email: string,
		password: string,
		image: string,
		rol: string
	) {
		super(id);
		this._name = name;
		this._email = email;
		this._password = password;
		this._image = image;
		this._rol = rol;
		this._state = true;
		this._google = false;
	}

	public static CreateUserWithtId(
		id: string,
		name: string,
		email: string,
		password: string,
		image: string,
		rol: string
	): User {
		return new User(id, name, email, password, image, rol);
	}

	public static CreateUserWithoutId(
		name: string,
		email: string,
		password: string,
		image: string,
		rol: string
	): User {
		return new User(undefined, name, email, password, image, rol);
	}

	public get name(): string {
		return this._name;
	}

	public changeName(name: string) {
		this._name = name;
	}

	public get email(): string {
		return this._email;
	}

	public get password(): string {
		return this._password;
	}

	public changePassword(password: string): void {
		this._password = password;
	}

	public get image(): string {
		return this._image;
	}

	public changeImage(image: string) {
		this._image = image;
	}

	public get rol(): string {
		return this._rol;
	}

	public changeRol(rol: string) {
		this._rol = rol;
	}

	public get state(): boolean {
		return this._state;
	}

	public desactiveUser(): void {
		this._state = false;
	}

	public activeUser(): void {
		this._state = true;
	}

	public get google(): boolean {
		return this._google;
	}

	public activeGoogle(): void {
		this._google = true;
	}
}
