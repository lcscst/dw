import jwt from 'jsonwebtoken';
import config from '../core/config.js';

export default function isAuthenticated(req, res, next) {

    try {
        const { authorization } = req.headers;
        const [, token] = authorization.split(' ');
        const { userId, username } = jwt.verify(token, config.secretKey);

        req.userId = userId;
        req.username = username;

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
