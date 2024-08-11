require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const dbURI = process.env.MONGO_DB;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

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
    Fees: { type: Number, min: 50 },
    Date: { type: Date }
});

const BookSchema = new mongoose.Schema({
    title: String,
    id: { type: String, unique: true },
    author: String,
    quantity: { type: Number, min: 0 },
    edition: { type: Number, min: 2000 },
    Category: String,
    Status: String,
});
const borrowerSchema = new mongoose.Schema({
    Student: String,
    BookName: String,
    DateBorrowed: String,
    DateReturned: String,
    Comments: String,
});


const UserModel = mongoose.model("librarians", UserSchema);
const StudentModel = mongoose.model("students", StudentSchema);
const BookModel = mongoose.model("Books", BookSchema);
const Borrower = mongoose.model('borrowers', borrowerSchema);

app.get("/getStudent", (req, res) => {
    StudentModel.find({})
        .then(users => {
            res.json({ "students": users });
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
            email,
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
        if (err.code === 11000) {
            res.status(400).json({ message: "Librarian is already registered" });
        } else {
            res.status(500).json({ message: "An error occurred during registration" });
        }
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
                    { expiresIn: '1h' }
                );
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
    const { firstName, lastName, email, phone, current_class, schoolID, Fees, Date } = req.body;
    try {
        const Student = new StudentModel({
            name: `${firstName} ${lastName}`,
            Email: email,
            phone: phone,
            current_class: current_class,
            schoolID: schoolID,
            Fees: Fees,
            Date: Date,
        })
        const student = await Student.save();
        res.json(student);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: "Student is already added" });
        } else {
            res.status(500).json({ message: "An error occurred during adding" });
        }
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
            Status: Status,
        });
        const book = await Book.save();
        res.json(book);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: "Book is already added" });
        } else {
            res.status(500).json({ message: "An error occurred during adding" });
        }
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

app.post("/newborrower", async (req, res) => {
    console.log(req.body);

    const { Student, BookName, DateBorrowed, DateReturned, Comments } = req.body;
    try {
        const student = await StudentModel.findOne({ name: Student });
        if (!student) {
            console.log(`Student not found`)
            return res.status(404).json({ message: "Student not found" });
        }

        const book = await BookModel.findOne({ title: BookName, quantity: { $gt: 0 } });
        if (!book) {
            console.log(`book not found`)
            return res.status(404).json({ message: "Book not found or not available" });
        } else {
            console.log(`book available`)
            if (book.Status === 'Borrowed') {
                return res.status(400).json({ message: "Book is already borrowed" });
            }
        }
        const newBorrower = new Borrower({
            Student,
            BookName,
            DateBorrowed,
            DateReturned,
            Comments,
        });

        const savedBorrower = await newBorrower.save();

        book.quantity -= 1;

        if (book.quantity > 0) {
            book.Status = 'Available';
        } else {
            book.Status = 'Borrowed';
        }

        await book.save();

        res.status(201).json(savedBorrower);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/EditBookDate', async (req, res) => {
    const { Student, BookName, DateReturned } = req.body;
    try {
        const book = await Borrower.findOneAndUpdate(
            { Student: Student, BookName: BookName },
            { $set: { DateReturned: DateReturned } },
            { new: true }
        );
        res.json(book);

        const book2 = await BookModel.findOne({ title: BookName });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (!book2) {
            return res.status(404).json({ message: "Borrower not found" });
        } else {
            book2.Status = 'Available';
            book2.quantity += 1;
            await book2.save();
            return res.status(200).json(book);
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get("/borrowers", async (req, res) => {
    try {
        Borrower.find({})
            .then(borrower => {
                res.json({ borrowers: borrower });
            }).catch(err => {
                console.error(err);
                res.status(500).send(err);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/updateFees", async (req, res) => {
    const { Student, Fees, Date } = req.body;
    try {
        const student = await StudentModel.findOneAndUpdate(
            { name: Student },
            { $set: { Fees: Fees, Date: Date } },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port 5000`));
