const express = require('express');
const mongoose = require('mongoose'); // Import mongoose for ObjectId validation
const router = express.Router();
const { Student, validate } = require('../Models/studentModel'); // Corrected import path

router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (error) {
        console.error(`Error occurred while fetching students: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const student = new Student({
        name: req.body.name,
        isEnrolled: req.body.isEnrolled,
        phone: req.body.phone // Changed to camelCase
    });
    try {
        await student.save();
        res.send(student);
    } catch (error) {
        console.error(`Error occurred while saving student: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const student = await Student.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isEnrolled: req.body.isEnrolled,
            phone: req.body.phone // Changed to camelCase
        }, { new: true });

        if (!student) return res.status(404).send('The student with the given ID was not found.');

        res.send(student);
    } catch (error) {
        console.error(`Error occurred while updating student: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid ID format.');
        }

        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send('The student with the given ID was not found.');
        }

        res.send(student);
    } catch (error) {
        console.error(`Error occurred while deleting student: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send("The student with the given ID was not found.");
        res.send(student);
    } catch (error) {
        console.error(`Error occurred while fetching student: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
