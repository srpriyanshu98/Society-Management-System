import express from "express";
import cookieParser from "cookie-parser";

// importing environmet variables
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/authroutes.js";
import societyRoutes from "./routes/societyRoutes.js";

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/societies", societyRoutes);

app.listen(PORT, () => {
  console.log("server is running on port http://localhost:" + PORT);
  connectDB();
});
