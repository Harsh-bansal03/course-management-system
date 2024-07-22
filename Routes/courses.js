const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Course, validate } = require('../Models/courseModel'); // Corrected import path
const { Category } = require('../Models/categoryModel'); // Corrected import path

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (error) {
        console.error(`Error occurred while fetching courses: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const course = new Course({
        title: req.body.title,
        category: req.body.categoryId, // Assign the categoryId directly
        creator: req.body.creator,
        rating: req.body.rating
    });
    try {
        await course.save();
        res.send(course);
    } catch (error) {
        console.error(`Error occurred while saving course: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});


router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const category = await Category.findById(req.body.categoryId);
        if (!category) return res.status(404).send('Invalid category Id');
        
        const course = await Course.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            category: {
                _id: category._id,
                name: category.name
            },
            creator: req.body.creator,
            rating: req.body.rating
        }, { new: true });

        if (!course) return res.status(404).send('The course with the given ID was not found.');

        res.send(course);
    } catch (error) {
        console.error(`Error occurred while updating course: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid ID format.');
        }

        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).send('The course with the given ID was not found.');
        }

        res.send(course);
    } catch (error) {
        console.error(`Error occurred while deleting course: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).send("The course with the given ID was not found.");
        res.send(course);
    } catch (error) {
        console.error(`Error occurred while fetching course: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
