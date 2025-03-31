import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
 return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
 level: "info",
 format: combine(errors({ stack: true }), timestamp(), logFormat),
 transports: [
  new transports.Console({
   format: combine(colorize({ all: true }), timestamp(), logFormat),
  }),
 ],
});

export default logger;
