import { v2 as cloudaniry } from 'cloudinary';

cloudaniry.config(process.env.CLOUDINARY_URL);

const upload = async (path: string) => {
	const result = await cloudaniry.image(path);
};
