import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    // winston.format.label({ label: 'right meow!' }),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: './logs/debug.log', level: 'debug' }),
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/uncaughtExceptions.log' }),
  ],
});
