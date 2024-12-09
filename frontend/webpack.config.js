import CompressionPlugin from "compression-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
	plugins: [
		new CompressionPlugin({
			algorithm: "gzip",
			test: /\.(js|css|html)$/,
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: "src/assets", to: "assets" }],
		}),
	],
};
