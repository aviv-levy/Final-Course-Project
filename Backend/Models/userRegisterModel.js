const JOI = require("joi");
const mongoose = require("mongoose");
const userModelScheme = require('../Schemas/userSchema.js');



// JOI Validations
const baselineValidation = {
    firstname: JOI.string().required().min(2).max(20).alphanum(),
    lastname: JOI.string().required().min(2).max(20).alphanum(),
    phone: JOI.string().required().pattern(new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")),
    email: JOI.string().required().email(),
    password: JOI.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/),
    img: JOI.string().uri(),
    img_alt: JOI.string(),
    // city: JOI.string().required().min(3).max(40).pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")),
    // street: JOI.string().required().min(3).max(40).pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")),
    // housenum: JOI.number().required(),
    biz: JOI.boolean(),
    likedProducts: JOI.allow(),
    status: JOI.allow(),
    loginTries: JOI.allow()
};



// Post Validation
userModelScheme.statics.validatePost = (obj) => {
    return JOI.object({
        ...baselineValidation,
        id: JOI.string().forbidden()
    }).validate(obj, { abortEarly: false });
}

const UserRegisterModel = mongoose.model("UserRegisterModel", userModelScheme, "users");

module.exports = UserRegisterModel;