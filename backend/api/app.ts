import 'reflect-metadata';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import path from 'path';

import mongooseConnection from '../services/database/moongose/connection';
import { error404, errorHandler } from './middleware/errors/errorControl';
import routes from './routes/routes';

dotenv.config();
mongooseConnection();

const app = express();

app.set('port', process.env.PORT || '3000');

app
	.use(express.static(path.join(__dirname, '../frontend/public')))
	.use(morgan('dev'))
	.use(cors())
	.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/', createParentPath: true }))
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use('/v1', routes)
	.use(error404)
	.use(errorHandler);

export default app;
