const { LOG_FORMAT } = process.env

const {
	format,
	createLogger,
	transports
} = require('winston')

const {
	combine,
	timestamp,
	label,
	printf
} = format

const formats = {
	json: printf(info => JSON.stringify(info)),
	text: printf(info => `${info.timestamp} [${info.label}]`
		+ ` ${info.level}: ${info.message}`)
}

const logger = createLogger({
	level: process.env.LOG_LEVEL || 'info',
	format: combine(
		label({ label: 'SAPIEN-API' }),
		timestamp(),
		formats[LOG_FORMAT]
	),
	transports: [
		new transports.Console({
			stderrLevels: [
				'error',
				'crit',
				'alert',
				'emerg'
			]
		})
	]
})

module.exports = logger
