const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('../Models/categoryModel')

const CourseSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 250,
    },
    category: {
        type:categorySchema,
        requried:true
    },
    creator: {
        type: String,
        required: true,
        minlength: 5, // Corrected method name from require to required
    },
    rating: {
        type: Number,
        required: true,
        min: 0, // Corrected method name from require to required
    }
});

const Course = mongoose.model('Course', CourseSchema);

function validateData(course) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(250).required(),
        category: Joi.string().required(),
        creator: Joi.string().min(5).required(), // Corrected method name from require to required
        rating: Joi.number().min(0).required() // Corrected method name from require to required
    });
    return schema.validate(course); // Corrected variable name from category to course
}

module.exports = {
    Course: Course,
    validate: validateData
};
