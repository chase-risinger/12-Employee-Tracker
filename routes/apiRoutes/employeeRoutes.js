const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//GET all employees
router.get('/employee', (req, res) => {
    const sql = `SELECT employee.*, role.title
    AS job_title
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id`;

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

// GET a single employee
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT employee.*, role.title
            AS job_title
            FROM employee
            LEFT JOIN role
            ON employee.role_id = role.id
            WHERE employee.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});



module.exports = router