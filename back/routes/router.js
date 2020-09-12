const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
const uuid = require('uuid');
const pool = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');
const { response } = require('express');

const salt = ("LOGIN7D")

router.post('/Register', userMiddleware.validateRegister, (req, res, next) => {
    const { emailuser, password, nextWeek} = req.body
    pool.query(`SELECT * FROM users WHERE email = $1`, [emailuser], (err, result) => {
        if (result.rows.length > 0) {
            return res.status(409).send({
                msg: 'This username is already in use!'
            });
        } else {
            // username is available
            const tohash = sha1(salt + password)
            pool.query(`INSERT INTO users (id, email, password, expiration) VALUES ($1, $2, $3, $4)`, [uuid.v4(), emailuser, tohash, nextWeek], (error, result) => {
                if (error) {
                    console.log(error)
                    return res.status(400).send({
                        msg: error
                    });
                }
                res.status(201).send({
                    msg: 'Registered!'
                });
            });
        }
    });

});
module.exports = router;