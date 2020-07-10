const mongoose = require('mongoose');
const Schema = mongoose.SchemaType;

// Define collection and scheme
let Student = new Schema({
    student_name: {
        type: String
    },
    student_email: {
        type: String
    },
    section: {
        type: String
    },
    subjects: {
        type: Array
    },
    gender: {
        type: String
    },
    dob: {
        type: Date
    }
}, {
    collection: 'students'
})

module.exports = mongoose.model('Student', Student)