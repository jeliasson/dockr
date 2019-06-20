const path = require('path');

const root = path.dirname(require.main.filename).split(path.sep).slice(0, -1).join(path.sep);

const paths = {

    root: root,
    config: root + '/config',
    logs: root + '/logs',
    
    app: {
        root: root + '/app',
        bin: root + '/app/bin',
        src: root + '/app/src',
        tmp: root + '/app/tmp',
        utils: __dirname
    },

    docker: {
        compose: root + '/docker-compose.yaml'
    },

    script: {
        entrypoint: require.main.filename,
    }    
}

module.exports = paths