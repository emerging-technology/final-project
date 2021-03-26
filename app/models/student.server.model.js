// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
// (student number, password, first name, last name, address, city, phone number, email, program) 
// Define a new 'StudentSchema'
var StudentSchema = new Schema({
	studentNumber:String,
    firstName: String,
	lastName: String,
	address: String,
	city: String,
	phoneNumber: String,
	email: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"],
		// Set a unique 'studentNumber' index
		unique: true,
		// Validate 'studentNumber' value existance
		required: 'Student Number is required',
		// Trim the 'studentNumber' field
		trim: true
	},
	program: String,
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	},
	courses: [{type: Schema.Types.ObjectId, ref: 'Course',  unique: true}]
});

// Set the 'fullname' virtual property
StudentSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
// before saving it into database
StudentSchema.pre('save', function(next){
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating student
StudentSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the student enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};


// Configure the 'StudentSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Student' model out of the 'StudentSchema'
mongoose.model('Student', StudentSchema);