import User from "../models/user.js";
import jwt from 'jsonwebtoken';

const authentication = async (req, res, next) => {
    const headers = req.headers.authorization
    if (!headers || !headers.startsWith('Bearer ')) {
        res.status(500).json('Authentication invalid');
    }
    const token = headers.split(' ')[1];
    try {
        if (token.length < 500) {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { userId: payload.userId, name: payload.name }
        }
        else {
            const payload = jwt.decode(token);
            req.user = { userId: payload.sub, name: payload.name }
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong Try again");
    }
}

export default authentication;