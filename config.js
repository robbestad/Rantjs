var src = 'app';
var build = 'dist';
module.exports = {
    nodemon: {
        development: {
            script: './server/index.js',
            ext: 'js jsx scss',
            env: {'NODE_ENV': 'development'},
            watch: [
                './index.js',
                './dist'
            ],
            ignore: [
                'node_modules'
            ]
        }
    },
    delete: {
        src: ["dist/**/*"]
    },
    sass: {
        src: './scss/**/*.{sass,scss}',
        dest: './public/stylesheets',
        options: {
            noCache: true,
            compass: false,
            bundleExec: true,
            sourcemap: true,
            sourcemapPath: './public/css'
        }
    },
    autoprefixer: {
        browsers: [
            'last 2 versions',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ],
        cascade: true
    }
};