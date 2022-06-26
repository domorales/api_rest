import { createLogger, format, transports } from 'winston';

const myFormat = format.printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});
const logger = createLogger({
	format: format.combine(format.timestamp(), myFormat, format.errors({ stack: true })),
	handleExceptions: true,
	transports: [
		new transports.Console({ level: 'debug' }),
		new transports.File({
			maxsize: 512000,
			maxFiles: 5,
			filename: `${__dirname}/../../../logs/ErrorLog.log`,
			level: 'info',
		}),
	],
});

export default logger;
