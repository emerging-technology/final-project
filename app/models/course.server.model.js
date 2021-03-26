const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// (course code, course name, section, semester)
const CourseSchema = new Schema({
    courseCode: {
        type: String, default: '',
        trim: true
    },
    courseName: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    section: {
        type: Number, default: 1,
        trim: true
    },
    semester: Number,
    students: [ {type: Schema.Types.ObjectId, ref: 'Student', unique: true}]
});
mongoose.model('Course', CourseSchema);
