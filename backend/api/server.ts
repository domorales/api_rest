import app from './app';
import logger from './middleware/logger/logger';

const port = app.get('port');

app
	.listen(port, () => {
		logger.info(`EXITO AL LEVANTAR EL SERVER EN EL PUERTO ${port}`);
	})
	.on('error', (error) => {
		logger.error(`ERROR AL LEVANTAR EL SERVER EN EL PUERTO ${port}`);
		logger.error(error);
	});
