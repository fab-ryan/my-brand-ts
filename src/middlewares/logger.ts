import morgan from 'morgan';
import winston from 'winston';
import WinstonDailyRotatingFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, json } = winston.format;
const  logform = winston.Logform;


const fileCombineTransport = new WinstonDailyRotatingFile({
  filename: './logs/%DATE%-combined.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: 'http',
  format: combine(
    label({ label: process.env.LOG_LABEL || 'app' }),
    timestamp(),
    printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    }),
    json(),
  ),

  defaultMeta: { service: 'user-service' },
  transports: [
    fileCombineTransport,
    new winston.transports.Console(),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export const loggerMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => {
        logger.http(message.trim());
      },
    },
  },
);

export { logger };
