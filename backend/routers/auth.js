const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
router.post('/createUser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 cahracters").isLength({ min: 5 })
], async (req, res) => {
    try {
        //VALIDATING THE INPUT PROVIDED
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        //CHECK WHETHER THE USER EXISTS 
        let email = req.body.email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "user email already exists" })
        }
        //CREATING THE USER AND SAVING IT IN DATABASE
        user = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        }).then(user => res.json(user));
    }
    catch (err) {
        res.status(400).send("Server error")
    }
})
module.exports = router