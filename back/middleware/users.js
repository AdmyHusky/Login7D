const express = require('express');
module.exports = {
  validateRegister: (req, res, next) => {
    // password min 7 chars
    if (!req.body.password || req.body.password.length <= 7) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 7 chars'
      });
    }
    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const tokenPayload = token.split(' ')[1]
      const decoded = jwt.verify(
        tokenPayload,
        'LOGIN7D'
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  }
}