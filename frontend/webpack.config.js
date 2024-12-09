import CompressionPlugin from "compression-webpack-plugin";

export default {
	plugins: [
		new CompressionPlugin({
			algorithm: "gzip",
			test: /\.(js|css|html|svg)$/,
		}),
	],
};
