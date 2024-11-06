import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// importing environmet variables
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

// Serve static files in 'uploads' directory
app.use("/uploads", express.static("uploads"));

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

import authRoutes from "./routes/authroutes.js";
import societyRoutes from "./routes/societyRoutes.js";
import importantNumberRoutes from "./routes/importantNumberRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/societies", societyRoutes);
app.use("/api/important-numbers", importantNumberRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/tenants", tenantRoutes);

app.listen(PORT, () => {
    console.log("server is running on port http://localhost:" + PORT);
    connectDB();
});
