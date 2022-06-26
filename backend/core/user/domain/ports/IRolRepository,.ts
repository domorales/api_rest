export default interface IRolResposotory {
	ifExistRolOrFail(rol: string): Promise<boolean>;
}
