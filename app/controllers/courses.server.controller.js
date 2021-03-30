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
    console.log(req.student.id)
    Student.findOne({_id: req.student.id}).populate('courses').exec((err, student) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log(student.courses)
            res.status(200).json(student.courses);
        }
    })
}
exports.courseById = function (req, res, next, id) {
    Course.findOne({ _id: id }).populate('student', 'firstName').exec((err, course) => {
		if (err) {			// Call the next middleware with an error message
			return next(err);
		} else {			// Set the 'req.student' property
            console.log(course);
            req.course = course;
			next(); // Call the next middleware
		}
	});
};
exports.studentById = (req, res, next, id) => {
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
    res.status(200).json(students);
};
exports.enrolled = (req, res) => {
    console.log(req.course)
    Student.find({}).exec((err, students) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // console.log(students)
            let enrolledStudents = []
            for (let i = 0; i < students.length; i++) {
                // console.log(students[i])
                for (let j = 0; j < students[i].courses.length; j++) {
                    if (String(req.course._id) == String(students[i].courses[j])) {
                        console.log("Found curr enrolled student:", students[i].courses[j])
                        enrolledStudents.push(students[i])
                    }
                }
            }
            res.status(200).json(enrolledStudents);
        }
    })
}
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
exports.drop = function (req, res) {    
    console.log("~~~~~~~~~~~~~~~~~~~~~~ In drop function")
    const course = new Course()
    course._id = mongoose.Types.ObjectId(req.course._id);
    course.courseName = req.course.courseName;
    course.courseCode = req.course.courseCode;
    course.semester = req.course.semester;
    course.section = req.course.section;
    console.log(course)
    console.log(req.id)
    // res.status(200).json(course);

    console.log(req.id)
    Student.findById(req.id, (err, student) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log("The student that was found", student.courses)
            console.log("The course that is being dropped", course)
            // student.courses.push(course)
            // student.save()
            // res.status(200).json(student);

            // let courseExists = false
            // console.log("courseId", course._id)
            // for (let i = 0; i < student.courses.length; ) {
            //     // console.log("courseExists part", student.courses[i])
            //     if (String(student.courses[i]) == String(course._id)) { 
            //         // courseExists = true
            //     }
            // }

            console.log()
            student.courses = student.courses.filter(x => String(x) != String(course._id))
            console.log("The updated courses", student.courses)

            // console.log(courseExists)
            // if (!courseExists) {
            //     student.courses.push(course)
            // }
            console.log("password", student.password)
            student.save()
            console.log("password", student.password)
            res.status(200).json(student);
        }
    }) 

    // const student = req.student;
    // course.students = course.students.filter(x=>x._id != req.id);
    // course.save()
    // course.courseName = req.body.courseName;
    // course.courseCode = req.body.courseCode;
    // course.semester = req.body.semester;
    // course.section = req.body.section;
    // course.save((err) => {
    //     if (err) {
    //         return res.status(400).send({
    //             message: getErrorMessage(err)
    //         });
    //     } else {
    //         console.log(course);
    //         res.status(200).json(course);
    //     }
    // });
    // next()
};
//
exports.enroll = function (req, res) {    
    console.log("~~~~~~~~~~~~~~~~~~~~~~ In enroll function")
    const course = new Course()
    course._id = mongoose.Types.ObjectId(req.course._id);
    course.courseName = req.course.courseName;
    course.courseCode = req.course.courseCode;
    course.semester = req.course.semester;
    course.section = req.course.section;
    // console.log("enroll's course", req.course.students)
    // req.course.students contains student to add course to
    // course.students.push(req.id);
    // console.log(req.course.students)
    console.log(req.id)
    Student.findById(req.id, (err, student) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log("The student that was found", student)
            console.log("The course that is being added", course)

            // add if not there already
            let courseExists = false
            // console.log("courseId", course._id)
            for (let i = 0; i < student.courses.length; i++) {
                // console.log("courseExists part", student.courses[i])
                if (String(student.courses[i]) == String(course._id)) { 
                    courseExists = true
                }
            }
            // console.log(courseExists)
            if (!courseExists) {
                student.courses.push(course)
            }

            student.save()
            res.status(200).json(student);
        }
    }) 

    // course.save()
    // course.save((err) => {
    //     if (err) {
    //         return res.status(400).send({
    //             message: getErrorMessage(err)
    //         });
    //     } else {

    //         res.status(200).json(course);
    //     }
    // });
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