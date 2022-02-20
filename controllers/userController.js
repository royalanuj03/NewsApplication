const User = require("../models/UserModel");
const mailer = require("../utils/Mailer");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");

const register = async (req, res, next) => {
    try {
        const { name, email, password, phonenumber, gender, language, martialstatus, dateofbirth, timeofbirth } = req.body;
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                success: false,
                msg: "Entered email id is already registered with us. login to continue"
            })
        }
        const user = new User({
            name, email, password, phonenumber, gender, language, martialstatus, dateofbirth, timeofbirth
        });
        //    save your object
        user.save(function (err, user) {
            if (err) {
                return next(err);
            }
            res.status(201).json({
                success: true,
                msg: "Account Created Successfully. Please log in" 
            })
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Server having some issues"
        });
    }
}

const authuser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            avatar: user.avatar,
            name: `Hi ${user.name}`,
            // email:user.email,
            token: generateToken(user._id)
        })

    }
    else {
        res.status(401).json({
            success: false,
            msg: "unauthorized user"
        })
    }
}

const getUserprofile = async (req, res) => {
    const user = await User.findById(req.header._id)
    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            password: user.password,
            phonenumber: user.phonenumber,
            gender: user.gender,
            language: user.language,
            martialstatus: user.martialstatus,
            dateofbirth: user.dateofbirth,
            timeofbirth: user.timeofbirth

        })
    }
    else {
        res.status(404).json({
            success: false,
            msg: "User not found"
        })
    }
}

const updateuserprofile = async (req, res) => {
    const user = await User.findById(req.header._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.avatar = req.body.avatar || user.avatar;
        user.password = req.body.password || user.password;
        user.phonenumber = req.body.phonenumber || user.phonenumber;
        user.gender = req.body.gender || user.gender;
        user.language = req.body.language || user.language;
        user.martialstatus = req.body.martialstatus || user.martialstatus;
        user.dateofbirth = req.body.dateofbirth || user.dateofbirth;
        user.timeofbirth = req.body.timeofbirth || user.timeofbirth;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            avatar: updatedUser.avatar,
            email: updatedUser.email,
            password: updatedUser.password,
            phonenumber: updatedUser.phonenumber,
            gender: updatedUser.gender,
            language: updatedUser.language,
            martialstatus: updatedUser.martialstatus,
            dateofbirth: updatedUser.dateofbirth,
            timeofbirth: updatedUser.timeofbirth,
            token: generateToken(updatedUser._id)
        });
    }
    else {
        res.status(400).json({
            success: false,
            msg: "User not found"
        })
    }
}

module.exports = {
    register, authuser, getUserprofile, updateuserprofile
}