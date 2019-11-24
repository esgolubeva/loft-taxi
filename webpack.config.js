const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, "src", "index.js"),
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				resolve: {
					extensions: [".js", ".jsx"]
				},
				exclude: /node_modules/,
				loaders: ["react-hot-loader/webpack", "babel-loader"]
			},
			{
				test: /\.css$/,
				loaders: ["style-loader", "css-loader"]
			},
			{
				test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff2?$|\.ttf$/,
				loader: "file-loader?name=[name].[ext]"
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
			filename: "index.html",
			publicPath: "/"
		})
	],
	devServer: {
		historyApiFallback: true
	}
};
