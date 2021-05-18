const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];

    }
    if (!token) {
        res.status(200).json({
            status: 401,
            message: "Not authorized to Access"
        })
    }
    try {
        console.log(token);
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        let value = await User.findByPk(decoded.id);
        req.user = value.dataValues;
        next();
    } catch (err) {
        res.status(200).json({
            status: 401,
            message: "Not authorized to Access"
        });
    }
}