const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmergencySchema = new Schema({
  addedOn: {
    type: Date,
    default: Date.now, 
  },
  status: {
    type: String,
    enum: ["New", "Old"],
    defaul: "New",
    trim: true,
  },
  message: {
    type: String,
    default: "",
    trim: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
});
mongoose.model("Emergency", EmergencySchema);
