// Load the module dependencies
const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;

//
// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'email already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};
// Create a new student
exports.create = function (req, res, next) {
    // Create a new instance of the 'Student' Mongoose model
    var student = new Student(req.body); //get data from React form
    console.log("body: " + req.body.email);

    // Use the 'Student' instance's 'save' method to save a new student document
    student.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(student);
            
        }
    });
};
//
// Returns all students
exports.list = function (req, res, next) {
    // Use the 'Student' instance's 'find' method to retrieve a new student document
    Student.find({}).populate('course', 'courseCode courseName section semester').exec(function (err, students) {
        if (err) {
            return next(err);
        } else {
			console.log(students)
            res.json(students);
        }
    });
};
//
//'read' controller method to display a student
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.student);
};
//
// 'studentByID' controller method to find a student by its id
exports.studentByID = function (req, res, next, id) {
	// Use the 'Student' static 'findOne' method to retrieve a specific student
	console.log("in studentById")
	Student.findOne({ _id: id }).populate('course', 'courseCode courseName section semester').exec((err, student) => {
		if (err) {
			console.log("error in studentById", err)
			// Call the next middleware with an error message
			return next(err);
		} else {
			console.log("no error in studentById")
			// Set the 'req.student' property
            req.student = student;
            console.log("student: " + student);
			// Call the next middleware
			next();
		}
	});
};
//update a student by id
exports.update = function(req, res, next) {
    console.log("update: " + req.body);
    Student.findByIdAndUpdate(req.student.id, req.body, function (err, student) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(student);
    });
};
// delete a student by id
exports.delete = function(req, res, next) {
    Student.findByIdAndRemove(req.student.id, req.body, function (err, student) {
      if (err) return next(err);
      res.json(student);
    });
};


exports.readEmail = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.student);
};

// 'studentByID' controller method to find a student by its id
exports.studentByEmail = function (req, res, next, email) {
	// Use the 'Student' static 'findOne' method to retrieve a specific student
	Student.findOne({
        email: email
	}, (err, student) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.student' property
            req.student = student;
            console.log("student: " + student);
			// Call the next middleware
			next();
		}
	});
};

//
// authenticates a student
exports.authenticate = function(req, res, next) {
	// Get credentials from request
	console.log(req.body)
	const email = req.body.auth.email;
	const password  = req.body.auth.password;
	console.log(password)
	console.log(email)
	//find the student with given email using static method findOne
	Student.findOne({email: email}, (err, student) => {
			if (err) {
				return next(err);
			} else {
			console.log(student)
			//compare passwords	
			if(bcrypt.compareSync(password, student.password)) {
				// Create a new token with the student id in the payload
  				// and which expires 300 seconds after issue
				const token = jwt.sign({ id: student._id, email: student.email }, jwtKey, 
					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
				console.log('token:', token)
				// set the cookie as the token string, with a similar max age as the token
				// here, the max age is in milliseconds
				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				console.log('screen:', { screen: student.email })
				res.status(200).send({ screen: student.email });
				//res.json({status:"success", message: "student found!!!", data:{student:
				//student, token:token}});
				req.student=student;
				//call the next middleware
				next()
			} else {
				res.json({status:"error", message: "Invalid email/password!!!",
				data:null});
			}
			
		}
		
	});
};
//
// protected page uses the JWT token
exports.welcome = (req, res) => {
	// We can obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token;
	console.log("Welcome: " + token);
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.status(401).end()
	}
  
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, return the welcome message to the student, along with their
	// email given in the token
	// use back-quotes here
	res.send(`${payload.email}`)
 };
 //
 //sign out function in controller
//deletes the token on the client side by clearing the cookie named 'token'
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	// Redirect the student back to the main application page
	//res.redirect('/');
}
//check if the student is signed in
exports.isSignedIn = (req, res) => {
	// Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token;
	console.log("is Signed In: "+token)
	// if the cookie is not set, return 'auth'
	if (!token) {
		console.log("screen:: "+{ screen: 'auth' });
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	console.log("screen:: "+{ screen: payload.email });
	console.log("payload:: "+ payload);
	// Finally, token is ok, return the email given in the token
	res.status(200).send({ screen: payload.email });
}

//isAuthenticated() method to check whether a student is currently authenticated
exports.requiresLogin = function (req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token;
	console.log("requires login "+ token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
		// The student variable is not defined
		// console.log("screen:: "+{ screen: student.email });
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	  console.log('in requiresLogin - payload:',payload)
	  req.id = payload.id;
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
	// student is authenticated
	//call next function in line
    next();
};