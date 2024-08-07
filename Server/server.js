const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_secret_key';
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Library");

const UserSchema = new mongoose.Schema({
    name: String,
    Email: { type: String, unique: true },
    password: String,
    schoolID: String,
});
const StudentSchema = new mongoose.Schema({
    name: String,
    Email: { type: String, unique: true },
    phone: String,
    current_class: String,
    schoolID: String,
});

const BookSchema = new mongoose.Schema({
    title: String,
    id: { type: String, unique: true },
    author: String,
    quantity: { type: Number, min: 3 },
    edition: { type: Number, min: 2000 },
    Category: String,
    Status: String,
});

const UserModel = mongoose.model("librarians", UserSchema);
const StudentModel = mongoose.model("students", StudentSchema);
const BookModel = mongoose.model("Books", BookSchema);

app.get("/getStudent", (req, res) => {
    StudentModel.find({})
        .then(users => {
            res.json({ "students" : users });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error retrieving students");
        });
});

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, schoolID } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const newUser = new UserModel({
            name: `${firstName} ${lastName}`,
            Email: email,
            password: hashedPassword,
            schoolID,
        });

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '1201724@student.birzeit.edu',
                pass: 'mdmr hupa camg kidt'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: '1201724@student.birzeit.edu',
            to: email,
            subject: 'Birzeit Library',
            text: 'Welcome to Library Birzeit !!!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await UserModel.findOne({ Email: email });
        if (student) {
            const isMatch = bcrypt.compareSync(password, student.password);
            if (isMatch) {
                const token = jwt.sign(
                    { id: student._id, name: student.name, Email: student.Email, schoolID: student.schoolID },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );
                console.log(token);
                res.json({ message: "Sign in successful", token });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


app.post('/AddStudent', async (req, res) => {
    const { firstName, lastName, email, phone, current_class, schoolID } = req.body;

    try {
        const Student = new StudentModel({
            name: `${firstName} ${lastName}`,
            Email: email,
            phone: phone,
            current_class: current_class,
            schoolID: schoolID,
        })
        const student = await Student.save();
        res.json(student);
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).send(err);
    }
});
app.post('/AddBook', async (req, res) => {
    const { title, id, author, quantity, edition, category, Status } = req.body;
    try {
        const Book = new BookModel({
            title: title,
            id: id,
            author: author,
            quantity: quantity,
            edition: edition,
            Category: category,
            Status: Status
        });
        const book = await Book.save();
        res.json(book);
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).send(err);
    }
});
app.get("/getBooks", (req, res) => {
    BookModel.find({})
        .then(books => {
            res.json({ books: books });
        }).catch(err => {
            console.error(err);
            res.status(500).send(err);
        });

});
app.listen(5000, () => console.log(`Server running on port 5000`));
