/* 
 basic express configuration
 uses helmet for added safety
 get routes from all features
 */

const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const { readdirSync } = require('fs')
const bodyParser = require('body-parser')
const compression = require('compression')
const methodOverride = require('method-override')

const { info } = require('./logger')

const stream = {
	write: msg =>
		info(msg.substring(0, msg.lastIndexOf('\n')))
}

const app = express()

module.exports = () => {
	app.use(helmet())

	app.use(compression())

	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())

	app.use(methodOverride())

	app.use(morgan('combined', { stream }))

	const features = readdirSync('./src/features')

	for (let f of features) {
		f = require(`../src/features/${f}`)
		if (f.api && f.api.route)
			f.api.route(app)
	}

	return app
}	