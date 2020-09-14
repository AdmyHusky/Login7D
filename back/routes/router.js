const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
const uuid = require('uuid');
const pool = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const salt = ("LOGIN7D")

router.post('/Register', userMiddleware.validateRegister, (req, res, next) => {
    const { emailuser, password, date } = req.body
    pool.query(`SELECT * FROM users WHERE email = $1`, [emailuser], (err, result) => {
        if (result.rows.length > 0) {
            return res.status(409).send({
                msg: 'This username is already in use!'
            });
        } else {
            // username is available
            const tohash = sha1(salt + password)
            pool.query(`INSERT INTO users (id, email, password, expiration) VALUES ($1, $2, $3, $4)`, [uuid.v4(), emailuser, tohash, date], (error, result) => {
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
router.post('/Login', (req, res, next) => {
    const { emailuser, password } = req.body
    pool.query(`SELECT * FROM users WHERE email =  $1`, [emailuser], (err, result) => {
        if (err) {
            return res.status(400).send({
                msg: 'err'
            });
        }
        if (!result.rows.length) {
            return res.status(401).send({
                msg: 'Username or password is incorrect!'
            });
        }
        // check password
        const tohash = sha1(salt + password)
        if (tohash == result.rows[0].password) {
            pool.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [emailuser, tohash], function (errorb, resultsb) {
                if (resultsb.rows.length > 0) {
                    const token = jwt.sign({
                        useremail: result.rows[0].email,
                        userexpiration: result.rows[0].expiration,
                    },
                        'LOGIN7D', {
                        expiresIn: '2h'
                    }
                    )
                    return res.status(200).send({
                        msg: 'Logged in!',
                        token,
                        user: result.rows[0]
                    });
                }
                // wrong password
                else {
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
            });
        } else {
            return res.status(401).send({
                msg: 'Username or password is incorrect!'
            });
        }
    });

});
router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = router;