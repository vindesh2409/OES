const express = require('express');
const fs = require('fs');
const router = express.Router();
const dbPath = './db.json';

// Admin login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));
    const admin = db.admins.find(a => a.username === username && a.password === password);
    if (admin) res.json({ success: true });
    else res.json({ success: false, message: "Invalid credentials" });
});

// Add exam
router.post('/add-exam', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    const exam = req.body;
    exam.id = db.exams.length + 1;
    db.exams.push(exam);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json({ success: true, exam });
});

// Get all exams
router.get('/exams', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    res.json(db.exams);
});

module.exports = router;
