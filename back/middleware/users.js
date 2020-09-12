const express = require('express');
module.exports = {
    validateRegister: (req, res, next) => {
        // password min 7 chars
        
        next();
    }
}