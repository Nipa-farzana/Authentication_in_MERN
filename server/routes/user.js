const router = require('express').Router();
const { number } = require('joi');
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {

    try {
        const { error } = validate(req.body);
        if (error) 
            return res.status(400).send(error.details[0].message);
        const user = await User.findOne({ email: req.body.email });

        if(data) 
            return res.status(409).send('User already registered.');
        const salt = await bcrypt.genSalt(number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await User.create({...req.body, password: hashedPassword}).save();
        res.status(201).send('User registered successfully.');

   //code here
    } catch (error) {
        res.status(500).send('Internal server error');
    }
    //code here
});

module.exports = router;