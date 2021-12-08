const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/department', (req, res) => {
    const sql = `SELECT department.* FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//GET a single department
router.get('/department/:id', (req, res) => {
    const sql = `SELECT department.* FROM department
    WHERE department.id = ?`;

    db.query(sql, req.params.id, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

module.exports = router