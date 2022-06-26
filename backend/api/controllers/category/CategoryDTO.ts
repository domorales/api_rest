import UserDTO from '../user/UserDTO';

export default interface CategoryDTO {
	uid: string;
	name: string;
	user: UserDTO;
}
