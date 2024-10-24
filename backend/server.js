import express from "express";
import cookieParser from "cookie-parser";

// importing environmet variables
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

//routes

app.listen(PORT, () => {
	console.log("server is running on port http://localhost:" + PORT);
	connectDB();
});
