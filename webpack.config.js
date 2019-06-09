const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html
const tsImportPluginFactory = require('ts-import-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //多线程压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css压缩
const CleanWebpackPlugin = require('clean-webpack-plugin') //清空
var WebpackNotifierPlugin = require('webpack-notifier');   //消息通知
const DevserverQRcodeWebpackPlugin = require('devserver-qrcode-webpack-plugin');   //二维码
const webpack = require('webpack')
const HappyPack = require('happypack'); //多线程运行
const happyThreadPool = HappyPack.ThreadPool({
	size: 4
});
const os = require('os');
function getNetworkIp() {      //获取IP
	let needHost = ''; // 打开的host
	try {
		// 获得网络接口列表
		let network = os.networkInterfaces();
		for (let dev in network) {
			let iface = network[dev];
			for (let i = 0; i < iface.length; i++) {
				let alias = iface[i];
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					needHost = alias.address;
				}
			}
		}
	} catch (e) {
		needHost = 'localhost';
	}
	return needHost;
}

console.log(getNetworkIp())

const {
	argv
} = process;

let developmentMode = true; //开发模式
argv.forEach(v => {
	if (v == 'production') {
		developmentMode = false;
	}
});

const plugins = [
	//	new webpack.DllPlugin({
	//          // 定义程序中打包公共文件的入口文件vendor.js
	//          context: process.cwd(),
	//          // manifest.json文件的输出位置
	//          path: path.join('./src', 'js', 'dll', '[name]-manifest.json'),
	//          // 定义打包的公共vendor文件对外暴露的函数名
	//          name: '[name]_[hash]'
	//      }),
	new CleanWebpackPlugin(['dist'], {
		root: __dirname,
	}),
	new WebpackNotifierPlugin(),
	new DevserverQRcodeWebpackPlugin({
		size: 'small'
	}),
	new HtmlWebpackPlugin({
		template: `${__dirname}/index.html`, //源html
		inject: 'body', //注入到哪里
		filename: 'index.html', //输出后的名称
		hash: true, //为静态资源生成hash值
	}),
	new MiniCssExtractPlugin({
		//css添加hash
		// filename: '[name]-[hash].css',
		// chunkFilename: '[id][hash].css',
		chunkFilename: '[chunkhash].css',
		filename: 'index.css',
	}),
	new HappyPack({
		//多线程运行 默认是电脑核数-1
		id: 'babel', //对于loaders id
		loaders: ['babel-loader?cacheDirectory'], //是用babel-loader解析
		threadPool: happyThreadPool,
		verboseWhenProfiling: true, //显示信息
	}),
	new UglifyJsPlugin({
		sourceMap: true, //webpack会生成map，所以这里不需要
		parallel: 2,
		cache: true,
		uglifyOptions: {
			output: {
				comments: false,
				beautify: false,
			},
			compress: {
				drop_console: true,
				warnings: false,
				drop_debugger: true,
			},
		},
		exclude: /(node_modules|bower_components)/,
	}), //压缩，生成map
];

module.exports = {
	entry: './src/index.tsx',
	devServer: {
		host: getNetworkIp(),
		contentBase: path.join(__dirname, 'dist'), //开发服务运行时的文件根目录
		compress: true, //开发服务器是否启动gzip等压缩
		port: 12307, //端口
		historyApiFallback: true, //不会出现404页面，避免找不到
		hotOnly:true
	},
	output: {
		filename: 'index.js',
		path: __dirname + '/dist',
		// filename: '[id].[hash].js', //出口文件名称
		chunkFilename: '[id][hash].js', //按需加载名称
		// chunkFilename: '[chunkhash].js', //按需加载名称
		publicPath: developmentMode ? '/' : './', //公共路径
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: developmentMode ? 'cheap-eval-source-map' : 'source-map', //cheap-eval-source-map  是一种比较快捷的map,没有映射列

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.less'],
		mainFields: ['main', 'jsnext:main', 'browser'],
		alias: {
			"@": path.resolve(__dirname, 'src/')
		}
	},
	module: {
		noParse: /node_modules\/(moment\.js)/, //不解析
		rules: [{
			test: /\.(html)$/,
			use: {
				loader: 'html-loader',
				options: {
					attrs: [':data-src'], //为了做图片懒加载，那些属性需要被，制定什么属性被该loader解析
					minimize: !developmentMode,
				},
			},
		},

		// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
		{
			test: /\.(js|jsx|ts|tsx)?$/,
			use: [{
				loader: 'happypack/loader?id=babel',
			}, {
				loader: 'babel-loader',
				options: {

				}
			},
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
					compilerOptions: {
						module: 'es2015'
					}
				}
			}
			]
		},
		{
			test: /\.(css|less)/,
			use: [{
				loader: MiniCssExtractPlugin.loader
			},
			
			{
				loader: 'css-loader',
			},
			{
				loader: 'less-loader',
				options: {
					javascriptEnabled: true
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: (loader) => [
						require('autoprefixer')(),
						require('postcss-flexbugs-fixes'),
						require('postcss-preset-env')({
							autoprefixer: {
								flexbox: 'no-2009',
							},
							stage: 3,
							browsers: [
								'> 1%',
								'last 2 versions',
								'Firefox ESR',
								'Opera 12.1',
								'not ie <= 8',
								'Android >= 4.0',
								'iOS 7'
							]
						}),
						require('postcss-aspect-ratio-mini')({}),
						// require('postcss-px-to-viewport')({
						// 	viewportWidth: 750, // (Number) The width of the viewport.
						// 	viewportHeight: 1334, // (Number) The height of the viewport.
						// 	unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
						// 	viewportUnit: 'vw', // (String) Expected units.
						// 	selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
						// 	minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
						// 	mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
						// 	exclude: /heart/gi //过滤文件夹
						// }),
						require('postcss-plugin-px2rem')({
							rootValue: {
								px: 124.2,
								rpx: 248.4
							},
							unitPrecision: 3,
							minPixelValue: 2
						}),
						require('postcss-write-svg')({
							utf8: false
						}),
						require('postcss-viewport-units')({})
					]
				}
			}
			],
		},
		// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
		{
			enforce: 'pre',
			test: /\.js$/,
			loader: 'source-map-loader'
		},

		{
			test: /\.(png|gif|jpg|jpeg|bmp|svg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name(file) {
						const path = file.substring(file.indexOf(moduleName + '/src') + 17, file.lastIndexOf('/')); // eslint-disable-line
						return 'static/' + moduleName + '/img' + path + '[hash:6].[ext]';
					}
				}
			},
			{
				loader: 'image-webpack-loader',
				options: {
					mozjpeg: {
						progressive: true,
						quality: 65
					},
					optipng: {
						enabled: false
					},
					pngquant: {
						quality: '65-90',
						speed: 4
					},
					gifsicle: {
						interlaced: false
					}
				}
			}
			]
		}
		],
	},
	plugins,
};