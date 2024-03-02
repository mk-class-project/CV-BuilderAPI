import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {    
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).send({ message: 'No token detected !' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorized !' });
    }
    return next();
};

export default verifyToken;