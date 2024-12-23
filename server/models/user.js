const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


const userSchema = new mongoose.Schema({
   firstName: {
       type: String,
       required: true,
       trim: true
   },
   lastName: {
       type: String,
       required: true,
       trim: true
   },
   email: {
       type: String,
       required: true,
       unique: true
   },
   password: {
       type: String,
       required: true
   }
});

userSchema.methods.toJSON = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '7 days' });
    return token;
}    

const User = mongoose.model('User', userSchema);

const validate = (user) => {
    const schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(user);
}