const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const course = new Course();
    course.courseName = req.body.courseName;
    course.courseCode = req.body.courseCode;
    course.semester = req.body.semester;
    course.section = req.body.section;    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
    //
    //
    // Student.findOne({username: req.body.username}, (err, student) => {    //     if (err) { return getErrorMessage(err); }
    //     //
    //     req.id = student._id;    // }).then( function () 
    // {
    //     course.save((err) => {
    //         if (err) {
    //             return res.status(400).send({
    //                 message: getErrorMessage(err)
    //             });
    //         } else {
    //             res.status(200).json(course);
    //         }
    //     });
    
    // });
};
//
exports.list = function (req, res) {
    Course.find({},(err, courses) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(courses);
        }
    });
};

exports.listByStudent = function (req, res){
    Course.find({students: req.student._id},(err, courses) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(courses);
        }
    });
}
exports.courseById = function (req, res, next, id) {
    Course.findOne({ _id: id }).populate('student', 'firstName').exec((err, course) => {
		if (err) {			// Call the next middleware with an error message
			return next(err);
		} else {			// Set the 'req.student' property
            console.log(course);
            req.course = course;			// Call the next middleware
			next();
		}
	});
};exports.studentById = (req, res, next, id) => {
  	// Use the 'Student' static 'findOne' method to retrieve a specific student	// Student.findOne({ _id: id }).populate('courses').exec((err, student) => {
	Student.findOne({ _id: id }).populate('course', 'courseCode courseName section semester').exec((err, student) => {
		if (err) {			// Call the next middleware with an error message
			return next(err);
		} else {			// Set the 'req.student' property
            req.student = student;			// Call the next middleware
			next();
		}
	});
}
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
exports.update = function (req, res) {    const course = req.course;
    course.courseName = req.body.courseName;
    course.courseCode = req.body.courseCode;
    course.semester = req.body.semester;
    course.section = req.body.section;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};//
exports.drop = function (req, res) {    const course = req.course;
    const student = req.student;
    course.students = course.students.filter(x=>x._id!=student._id);
    // course.save()
    // course.courseName = req.body.courseName;
    // course.courseCode = req.body.courseCode;
    // course.semester = req.body.semester;
    // course.section = req.body.section;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log(course);
            res.status(200).json(course);
        }
    });
    // next()
};
//
exports.enroll = function (req, res) {    
    const course = req.course;
    // const student = req.student;
    // course = req.body;
    course.students.push(req.id);
    // course.save()
    // course.courseName = req.body.courseName;
    // course.courseCode = req.body.courseCode;
    // course.semester = req.body.semester;
    // course.section = req.body.section;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {

            res.status(200).json(course);
        }
    });
    // next()
};exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};