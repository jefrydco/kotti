/*eslint no-undef: "error"*/
/*eslint-env node*/

const base = require('./webpack.config.js')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const version = process.env.VERSION || require('../package.json').version

const builds = {
	production: {
		config: {
			output: {
				filename: 'kotti-ui.min.js',
				libraryTarget: 'umd',
				path: path.resolve(__dirname, '../src/dist/'),
			},
		},
		env: 'production',
		externals: {
			vue: {
				root: 'Vue',
				commonjs: 'vue',
				commonjs2: 'vue',
				amd: 'vue',
			},
		},
		optimization: {
			minimize: true,
		},
	},
}

function genConfig(opts) {
	const config = merge({}, base, opts.config)

	config.plugins = config.plugins.concat([
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(opts.env || 'development'),
		}),
	])

	if (opts.env) {
		config.plugins = config.plugins.concat([
			new webpack.BannerPlugin({
				banner: `/*!
* Kotti-UI v${version}
* Released under the MIT License.
*/     `,
				raw: true,
				entryOnly: true,
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
		])
	}
	return config
}

module.exports = genConfig(builds['production'])
