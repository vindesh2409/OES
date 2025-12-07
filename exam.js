const express = require('express');
const fs = require('fs');
const router = express.Router();
const dbPath = './db.json';

// Submit exam
router.post('/submit', (req, res) => {
    const { studentId, examId, score } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));
    db.results.push({ studentId, examId, score });
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json({ success: true });
});

// Get student results
router.get('/results/:studentId', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    const results = db.results.filter(r => r.studentId == req.params.studentId);
    res.json(results);
});

module.exports = router;
