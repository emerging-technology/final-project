const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmergencySchema = new Schema({
  addedOn: {
    type: Date,
    default: Date.now, 
  },
  respondent: {
    type: String,
    default: "",
    trim: true,
  },
  message: {
    type: String,
    default: "",
    trim: true,
  },
});
mongoose.model("Emergency", EmergencySchema);
