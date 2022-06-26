import { Router } from 'express';

import userLogin from './auth/auth.routes';
import categoriesRoutes from './category/category.routes';
import productRoutes from './product/product.routes';
import userRoutes from './user/user.routes';

const router = Router();

router.use('/api/user', userRoutes);
router.use('/api/category', categoriesRoutes);
router.use('/api/product', productRoutes);
router.use('/api/login', userLogin);

//router.use('/api/search', searchRoutes);

export default router;
