const express = require("express");
const hash = require('password-hash');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Database connection config file access
const db = require("../config/db");

router.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post("/login", (req, res) => {
    const sql = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result[0]) {
            const pass_verity = hash.verify(req.body.password, result[0].password);
            if (pass_verity) {
                const payload = { id: result[0].user_id, name: result[0].name };
                const token = jwt.sign(payload, 'secretkey');
                res.send({ token });
            }
        } else {
            res.send('error no result');
        }
    });
});

router.put("/", (req, res) => {
    res.send("Put method Worked.....");
});

router.delete("/", (req, res) => {
    res.send("Delete method Worked.....");
});

router.patch("/", (req, res) => {
    res.send("Patch method Worked.....");
});

module.exports = router;
