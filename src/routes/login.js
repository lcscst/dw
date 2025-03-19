import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../core/prisma.js';
import { verifyPassword } from '../core/hash.js';
import config from '../core/config.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
    }

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if (!user) {
        return res.status(404).json({ message: 'Usuário ou senha incorretos' });
    }

    const isValid = await verifyPassword(user.password, password);

    if (!isValid) {
        return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, config.secretKey, {
        expiresIn: 3600
    });

    res.json({
        token: token
    });
});

export default router;
