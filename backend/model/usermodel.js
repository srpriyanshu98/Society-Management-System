import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		photo: { type: String },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phoneNumber: { type: String, required: true },
		country: { type: String, required: true },
		state: { type: String, required: true },
		city: { type: String, required: true },
		societyname: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Society",
			required: true,
		},
		role: {
			type: String,
			enum: ["security", "admin", "resident"],
			default: "resident",
		},
		password: { type: String, required: true },
		otp: {
			type: String,
		},
		otpExpiration: {
			type: Date,
			default: Date.now,
			get: (otpExpiration) => otpExpiration.getTime(),
			set: (otpExpiration) => new Date(otpExpiration),
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.comparePassword = function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
