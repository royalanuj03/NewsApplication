const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    phonenumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    martialstatus: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
    timeofbirth: {
        type: String,
        required: true
    }

})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('user', userSchema);