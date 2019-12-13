const path = require('path')

const root = path
	.dirname(require.main.filename)
	.split(path.sep)
	.slice(0, -1)
	.join(path.sep)

const paths = {
	root: root,
	backup: root + '/backup',
	config: root + '/config',
	logs: root + '/logs',

	app: {
		root: root + '/app',
		bin: root + '/app/bin',
		src: root + '/app/src',
		tmp: root + '/app/tmp',
		templates: root + '/app/templates',
		utils: __dirname,
	},

	docker: {
		compose: root + '/docker-compose.yaml',
	},

	script: {
		entrypoint: require.main.filename,
	},
}

module.exports = paths
