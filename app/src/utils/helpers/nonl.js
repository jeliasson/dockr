module.exports = function nonl(val) {
	return val.replace(/(\r\n|\n|\r)/gm, '')
}
