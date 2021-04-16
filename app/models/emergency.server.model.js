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
});
mongoose.model("Emergency", EmergencySchema);
