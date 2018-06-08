const helmet = require('helmet')
const express = require('express')
const { readdirSync } = require('fs')
const bodyParser = require('body-parser')
const compression = require('compression')
const methodOverride = require('method-override')

const app = express()

module.exports = () => {
	app.use(helmet())

	app.use(compression())

	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())

	app.use(methodOverride())

	const features = readdirSync('./src/features')

	for (let f of features) {
		f = require(`../src/features/${f}`)
		if (f.api && f.api.route)
			f.api.route(app)
	}

	return app
}	