const Joi = require('joi'); // Ensure Joi is capitalized consistently
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4, maxlength: 30 },
    isEnrolled: {
        type: Boolean,
        default: false,
    },
    phone: { // Changed to camelCase
        type: String,
        required: true,
        minlength: 10,
        maxlength: 25,
    }
});

const Student = mongoose.model('Student', studentSchema);

function validateData(student) {
    const schema = Joi.object({
        name: Joi.string().min(4).max(30).required(), // Adjusted to match schema
        phone: Joi.string().min(10).max(25).required(), // Changed to camelCase
        isEnrolled: Joi.boolean()
    });
    return schema.validate(student); // Correct validation method
}

module.exports = {
    Student: Student,
    validate: validateData
};
