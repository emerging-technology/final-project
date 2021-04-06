const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VitalSignSchema = new Schema({
  testedAt: {
    type: Date,
    default: Date.now, 
  },
  bodyTemperature: {
    type: Number,
    default: 36.5, // degree Celsius
    trim: true,
  },
  heartRate: {
    type: Number,
    default: 75, //beats per minute
    trim: true,
  },
  bloodPressure: {
    type: String,
    default: "", // 122/77 mmHg
    trim: true,
    required: "Blood Pressure cannot be blank",
  },
  respiratoryRate: {
    type: Number,
    default: 20, // breaths per minute
    trim: true,
  },
});
mongoose.model("VitalSign", VitalSignSchema);
