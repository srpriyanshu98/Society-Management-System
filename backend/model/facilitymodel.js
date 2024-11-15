import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
	{
		facilityName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		scheduleServiceDate: {
			type: Date,
			required: true,
		},
		remindBefore: {
			type: Number, // Number of days before the scheduled date to remind
			default: 1,
		},
	},
	{ timestamps: true }
);

const Facility = mongoose.model("Facility", facilitySchema);

export default Facility;
