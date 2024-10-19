const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'KunalPa$$wor@'
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
            return res.status(400).json({ error: "User email already exists" })
        }

        //Hashing the password
        let salt = await bcrypt.genSalt(10)
        let hashpass = await bcrypt.hash(req.body.password, salt)


        //CREATING THE USER AND SAVING IT IN DATABASE
        user = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: hashpass,
        })
        res.json(user);

        const data = {
            user: {
                id: user.id
            }
        }
        const jwtdata = jwt.sign(data, JWT_SECRET)
        console.log(jwtdata)
    }

    catch (err) {
        res.status(400).send("Server error")
    }
})
//Route 2
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 cahracters").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Enter the valid credentilas" })
        }
        // Password Matching with the database
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Enter the valid credentilas" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const jwtdata = jwt.sign(data, JWT_SECRET)
        res.json({ jwtdata })
    }
    catch (error) {
        res.status(400).send("Server error" + error)

    }
})

//Route Get user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(400).send("Server error" + error)
    }
})
module.exports = router