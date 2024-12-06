import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		photo: { type: String },
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String, unique: true },
		phoneNumber: { type: String },
		country: { type: String },
		state: { type: String },
		city: { type: String },
		societyname: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Society",
		},
		role: {
			type: String,
			// enum: ["security", "admin", "resident"],
			default: "admin",
		},
		password: { type: String },
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
