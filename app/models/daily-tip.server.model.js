const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DailyTip = new Schema({
  message: {
    type: String,
    default: "",
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});
mongoose.model("DailyTip", DailyTip);
