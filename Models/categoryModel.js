const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 }
});

const Category = mongoose.model('Category', categorySchema);

function validateData(category) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(category);
}

module.exports = {
    Category: Category,
    validate: validateData,
    categorySchema: categorySchema
};
