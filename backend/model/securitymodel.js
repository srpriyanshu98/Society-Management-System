import mongoose from "mongoose";

const securitySchema = new mongoose.Schema(
    {
        guardPhoto: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },
        shift: {
            type: String,
            enum: ["Day", "Night"],
            required: true,
        },
        shiftDate: {
            type: Date,
            required: true,
        },
        shiftTime: {
            type: String,
            required: true,
        },
        aadharCard: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Security = mongoose.model("Security", securitySchema);

export default Security;
