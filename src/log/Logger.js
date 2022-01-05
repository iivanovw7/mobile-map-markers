/**
 * Module contains simple custom logger.
 * Contains basic implementation of application logger.
 * @module log/Logger
 */
import Config from '../config';
import { formatLoggerDate } from '../utils/date';

import { loggerColorMap, logLevelMap, logModeMap } from './constants';

const { ERROR, DEBUG, SUCCESS, INFO, WARNING } = logLevelMap;
const { LOGGER_OFF, LOGGER_DEBUG } = logModeMap;

/**
 *  Logger class contains methods used for sending messages of appropriate type.
 */
class Logger {
    /**
     * Logger object instance.
     * @private
     */
    static instance;

    /**
     * Creates class instance.
     * @param {object} options - Logger options.
     * @private
     */
    constructor(options) {
        this.mode = options.logLevel || LOGGER_OFF;

        if (this.mode !== LOGGER_OFF) {
            Logger.sendMessage('Info', loggerColorMap.INFO, `Logger is in [${ this.mode }] mode.`);
        }
    }

    /**
     * Sends logger message of appropriate type
     * @param {string} type - message type
     * @param {string} color - (rgba) message color
     * @param {string} message - text message content
     *
     * @return {void}
     */
    static sendMessage(type, color, message) {
        const date = new Date();

        // eslint-disable-next-line no-console
        console.log(
            `%c[${ type }]%c ${ message }\n%c[Timestamp]%c ${ formatLoggerDate(date) }`,
            `color: ${ color }`,
            'color: inherit',
            `color: ${ color }`,
            'color: inherit'
        );
    }

    /**
     * The static method that controls the access to the singleton instance.
     * @return {Logger} logger instance.
     */
    static getInstance() {
        if (! Logger.instance) {
            Logger.instance = new Logger({ logLevel: Config.logLevel });
        }

        return Logger.instance;
    }

    /**
     * Creates logger message of appropriate type, allows debug messages in debug mode
     *
     * @param {object} args - arguments.
     *
     * @return {null|void} logger message.
     */
    send(args) {
        const { type, message } = args;
        const { mode } = this;

        if (mode === LOGGER_OFF) {
            return null;
        }

        switch (type) {
            case ERROR:
                return Logger.sendMessage('Error', loggerColorMap.ERROR, message);
            case SUCCESS:
                return Logger.sendMessage('Success', loggerColorMap.SUCCESS, message);
            case DEBUG:
                return mode === LOGGER_DEBUG
                    ? Logger.sendMessage('Debug', loggerColorMap.DEBUG, message)
                    : null;
            case WARNING:
                return mode === LOGGER_DEBUG
                    ? Logger.sendMessage('Warning', loggerColorMap.WARNING, message)
                    : null;
            case INFO:
                return mode === LOGGER_DEBUG
                    ? Logger.sendMessage('Info', loggerColorMap.INFO, message)
                    : null;
            default:
                return null;
        }
    }
}

/**
 * Logger operation mode.
 */
Logger.prototype.mode = LOGGER_OFF;

export default Logger;
