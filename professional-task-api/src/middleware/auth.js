const jwt = require('jsonwebtoken');
const { users } = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access denied. No token provided.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = users.find(u => u.id === decoded.id);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid token.'
        });
    }
};

module.exports = auth;