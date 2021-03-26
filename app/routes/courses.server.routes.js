const students = require('../../app/controllers/students.server.controller');
const courses = require('../../app/controllers/courses.server.controller');
//
module.exports = function (app) {
        app.route('/api/courses')
            .get(courses.list)
            .post(students.requiresLogin, courses.create);
        //
        app.route('/api/courses/:courseId')
            .get(courses.read)
            .put(students.requiresLogin, courses.update)
            .delete(students.requiresLogin,
                courses.delete);
        //
        app.route('/api/drop/:courseId')
                .put(students.requiresLogin,
                    courses.drop);
        app.route('/api/enroll/:courseId')
                .put(students.requiresLogin, 
                    courses.enroll);
        app.route('/showCourses/:studentId')
            .get(students.studentByID, courses.listByStudent);
        app.param('studentId', students.studentByID)
        app.param('courseId', courses.courseById);
};
 