import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    maintenanceAmount: {
      type: Number,
      required: true,
    },
    penaltyAmount: {
      type: Number,
      required: true,
    },
    maintenanceDueDate: {
      type: Date,
      required: true,
    },
    penaltyAfterDays: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);
export default Maintenance;
