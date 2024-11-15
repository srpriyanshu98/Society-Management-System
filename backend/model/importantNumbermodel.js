import mongoose from "mongoose";

const importantNumberSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	work: { type: String, required: true },
});

export default mongoose.model("ImportantNumber", importantNumberSchema);
