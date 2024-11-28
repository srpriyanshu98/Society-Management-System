import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        complainerName: { type: String, required: true },
        complaintName: { type: String, required: true },
        description: { type: String, required: true },
        wing: { type: String, required: true },
        unit: { type: String, required: true },
        priority: {
            type: String,
            enum: ["High", "Medium", "Low"],
            default: "Medium",
        },
        date: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ["Open", "Pending", "Solve"],
            default: "Open",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
