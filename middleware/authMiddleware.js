const jwt = require("jsonwebtoken");

const user = require("../models/UserModel");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.header = await user.findById(decoded.id).select('-password');
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({
                success: false,
                msg: "Session expired"
            })

        }
    }

    if (!token) {
        res.status(401).json({
            sucess: false,
            msg: "Not Authorized ,no token"
        })
    }
}
module.exports = protect;