const express = require('express');
const mongoose = require('mongoose');
const categories = require('./Routes/categories');
const student = require("./Routes/student");
const course = require("./Routes/courses")
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the categories route
app.use('/api/categories',categories);

//Mount the student route
app.use('/api/student' ,student);

app.use('/api/course' ,course)

// Connect to MongoDB
mongoose.connect('mongodb://localhost/learningplatform', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection to MongoDB successful"))
    .catch(err => console.error("Couldn't connect to MongoDB", err));

const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
