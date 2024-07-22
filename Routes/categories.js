const express = require('express');
const mongoose = require('mongoose');
const { Category, validate } = require('../Models/categoryModel');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        console.error(`Error occurred while fetching categories: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = new Category({
        name: req.body.name
    });
    try {
        await category.save();
        res.send(category);
    } catch (error) {
        console.error(`Error occurred while saving category: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!category) return res.status(404).send('The category with the given ID was not found.');
        res.send(category);
    } catch (error) {
        console.error(`Error occurred while updating category: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid ID format.');
        }
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).send('The category with the given ID was not found.');
        res.send(category);
    } catch (error) {
        console.error(`Error occurred while deleting category: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).send("The category with the given ID was not found.");
        res.send(category);
    } catch (error) {
        console.error(`Error occurred while fetching category: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
