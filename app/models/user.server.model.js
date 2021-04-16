// Load the module dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    // Validate the email format
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    // Validate the 'password' value length
    validate: [
      (password) => password && password.length > 6,
      "Password should be longer",
    ],
  },
  userType: {
    type: String,
    enum: ["Nurse", "Patient"],
    default: "Nurse",
  },
  vitalSigns: [{ type: Schema.Types.ObjectId, ref: "VitalSign" }],
  emergencies: [{ type: Schema.Types.ObjectId, ref: "Emergency"}],
  respondedEmergencies: [{ type: Schema.Types.ObjectId, ref: "Emergency"}],
  dailyTips: [{ type: Schema.Types.ObjectId, ref: "DailyTip"}],
});

// Set the 'fullname' virtual property
UserSchema.virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

// Use a pre-save middleware to hash the password
// before saving it into database
UserSchema.pre("save", function (next) {
  //hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function (password) {
  //compare the hashed password of the database
  //with the hashed version of the password the user enters
  return this.password === bcrypt.hashSync(password, saltRounds);
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model("User", UserSchema);
