import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist", // Output directory
		emptyOutDir: false,
		chunkSizeWarningLimit: 3000,
	},
	resolve: {
		alias: {
			// eslint-disable-next-line no-undef
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 3000,
	},
});
