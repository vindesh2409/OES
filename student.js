const express = require('express');
const fs = require('fs');
const router = express.Router();
const dbPath = './db.json';

// Student login/register
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));
    const student = db.students.find(s => s.email === email && s.password === password);
    if (student) res.json({ success: true, student });
    else res.json({ success: false, message: "Invalid credentials" });
});

router.post('/register', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    const student = req.body;
    student.id = db.students.length + 1;
    db.students.push(student);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json({ success: true, student });
});

// Get all exams
router.get('/exams', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    res.json(db.exams);
});

module.exports = router;
