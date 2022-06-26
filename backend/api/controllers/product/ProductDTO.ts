import CategoryDTO from '../category/CategoryDTO';
import UserDTO from '../user/UserDTO';

export default interface ProductDTO {
	uid?: string;
	name: string;
	price: number;
	state?: boolean;
	description?: string;
	image?: string;
	available?: boolean;
	user: UserDTO;
	category: CategoryDTO;
}
